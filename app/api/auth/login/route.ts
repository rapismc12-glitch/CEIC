import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const validUsername = process.env.ADMIN_USER || 'administración_rafaelmata';
        const validPassword = process.env.ADMIN_PASSWORD || 'rafael2227368798';

        if (username === validUsername && password === validPassword) {
            const token = await signToken(username);
            const response = NextResponse.json({ success: true }, { status: 200 });

            response.cookies.set({
                name: 'auth_token',
                value: token,
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 24 hours
            });

            return response;
        }

        return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
