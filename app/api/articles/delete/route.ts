import { NextResponse } from 'next/server';
import { deleteArticle } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
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

        const { slug, fileUrl } = await req.json();

        if (!slug) {
            return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
        }

        const result = await deleteArticle(slug, fileUrl);

        if (result.success) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
