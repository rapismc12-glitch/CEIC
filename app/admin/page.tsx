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
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-8 flex items-center justify-center">
            <div className="max-w-[1400px] w-full mx-auto">
                <DashboardClient initialArticles={articles} />
            </div>
        </div>
    );
}
