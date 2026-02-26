import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { verifyToken } from '@/lib/auth';
const pdfParse = require('pdf-parse');
import mammoth from 'mammoth';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds

export async function POST(req: Request) {
    try {
        // 1. JWT Authentication
        const cookieHeader = req.headers.get('cookie');
        const tokenCookie = cookieHeader?.split('; ').find(row => row.startsWith('auth_token='));
        const token = tokenCookie?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }

        // 2. Parse FormData
        const formData = await req.formData();
        const file = formData.get('file') as Blob | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = (file as any).name || 'upload';
        const fileType = file.type;

        // 3. Extract Text via pdf-parse or mammoth
        let extractedText = '';
        if (fileType === 'application/pdf') {
            const pdfData = await pdfParse(buffer);
            extractedText = pdfData.text;
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
        } else {
            return NextResponse.json({ error: 'Unsupported file type. Only PDF and DOCX are allowed.' }, { status: 400 });
        }

        // Check if text extraction worked
        if (!extractedText.trim()) {
            return NextResponse.json({ error: 'Could not extract text from document' }, { status: 400 });
        }

        // 4. Generate metadata with AI via OpenAI
        // Limit text to avoid huge token costs with large documents
        const truncatedText = extractedText.substring(0, 8000);

        const { text: jsonString } = await generateText({
            model: openai('gpt-4o'),
            system: `You are an assistant that analyzes academic or research documents and extracts key metadata.
      You MUST respond EXACTLY with a JSON object, no markdown wrappers, no formatting, just the raw JSON containing the following fields: 
      "Title" (string), "Abstract" (string - a short summary), "Tags" (string - comma separated keywords), "Type" (string - e.g., 'Article', 'Report', 'Research Paper').`,
            prompt: `Please extract the requested metadata from the following document text:\n\n${truncatedText}`,
        });

        // 5. Parse JSON metadata
        let metadata;
        try {
            const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
            metadata = JSON.parse(cleanJson);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', jsonString);
            return NextResponse.json({ error: 'AI parsing failed' }, { status: 500 });
        }

        // Fallback defaults if the model missed some properties
        const title = metadata.Title || fileName;
        const abstract = metadata.Abstract || 'No abstract generated';
        const tags = metadata.Tags || 'Uncategorized';
        const type = metadata.Type || 'Document';
        const niche = formData.get('niche') || 'General'; // Assume client might send 'niche' via form data, fallback to General
        const author = formData.get('author') || 'Unknown'; // Same for 'author'
        const date = new Date().toISOString();

        // Create a URL-friendly slug
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

        // 6. Upload file to Vercel Blob
        const blob = await put(`articles/${fileName}`, file, {
            access: 'public',
        });
        const fileUrl = blob.url;

        // 7. Insert data to Vercel Postgres
        await sql`
      INSERT INTO articles (slug, niche, title, date, author, abstract, tags, type, "fileUrl")
      VALUES (${slug}, ${niche as string}, ${title}, ${date}, ${author as string}, ${abstract}, ${tags}, ${type}, ${fileUrl})
    `;

        return NextResponse.json({
            success: true,
            article: { slug, title, abstract, tags, type, fileUrl }
        }, { status: 200 });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
