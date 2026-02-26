import { getArticles } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import './admin.css';

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
        <div className="admin-dashboard-wrapper admin-font">
            <DashboardClient initialArticles={articles} />
        </div>
    );
}
