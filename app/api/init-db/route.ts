import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await sql`
      CREATE TABLE IF NOT EXISTS articles (
        slug VARCHAR(255) PRIMARY KEY,
        niche VARCHAR(255) NOT NULL,
        title TEXT NOT NULL,
        date TIMESTAMP NOT NULL,
        author VARCHAR(255) NOT NULL,
        abstract TEXT NOT NULL,
        tags TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        "fileUrl" TEXT NOT NULL
      );
    `;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
