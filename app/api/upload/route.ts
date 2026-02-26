import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { verifyToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

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

        const fileName = (file as any).name || 'upload';

        // 3. Extract manual metadata
        const title = (formData.get('title') as string) || fileName;
        const abstract = (formData.get('abstract') as string) || 'Sin resumen proporcionado.';
        const tags = (formData.get('tags') as string) || 'Documento';
        const type = 'Documento';
        const niche = (formData.get('niche') as string) || 'General';
        const author = (formData.get('author') as string) || 'Unknown';
        const date = new Date().toISOString();

        // Create a URL-friendly slug
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

        // 4. Upload file to Vercel Blob (unmodified)
        const blob = await put(`articles/${fileName}`, file, {
            access: 'public',
        });
        const fileUrl = blob.url;

        // 5. Insert data to Vercel Postgres
        await sql`
      INSERT INTO articles (slug, niche, title, date, author, abstract, tags, type, "fileUrl")
      VALUES (${slug}, ${niche}, ${title}, ${date}, ${author}, ${abstract}, ${tags}, ${type}, ${fileUrl})
    `;

        return NextResponse.json({
            success: true,
            article: { slug, title, abstract, tags, type, fileUrl, niche }
        }, { status: 200 });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
