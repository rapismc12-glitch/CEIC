import { SignJWT, jwtVerify } from 'jose';

export async function signToken(username: string) {
    const secretKey = process.env.ADMIN_JWT_SECRET || 'llave-secreta-temporal-para-desarrollo';
    const secret = new TextEncoder().encode(secretKey);
    return await new SignJWT({ user: username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // El token expirará en 24 horas
        .sign(secret);
}

export async function verifyToken(token: string) {
    try {
        const secretKey = process.env.ADMIN_JWT_SECRET || 'llave-secreta-temporal-para-desarrollo';
        const secret = new TextEncoder().encode(secretKey);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}
