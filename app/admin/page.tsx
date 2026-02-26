import { getArticles } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function AdminPage() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth_token')?.value;

    if (!token) {
        redirect('/admin/login');
    }

    const payload = await verifyToken(token);
    if (!payload) {
        redirect('/admin/login');
    }

    const articles = await getArticles();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestor de Contenidos</h1>
                <DashboardClient initialArticles={articles} />
            </div>
        </div>
    );
}
