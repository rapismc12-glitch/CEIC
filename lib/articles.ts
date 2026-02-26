import { sql } from '@vercel/postgres';
import { del } from '@vercel/blob';

export interface Article {
    slug: string;
    niche: string;
    title: string;
    date: string | Date;
    author: string;
    abstract: string;
    tags: string;
    type: string;
    fileUrl: string;
}

export async function getArticles(): Promise<Article[]> {
    try {
        const { rows } = await sql<Article>`
      SELECT * FROM articles
      ORDER BY date DESC;
    `;
        return rows;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export async function deleteArticle(slug: string, fileUrl: string) {
    try {
        // Eliminar archivo correspondiente en Vercel Blob
        if (fileUrl) {
            await del(fileUrl);
        }

        // Eliminar registro del artículo en la base de datos Postgres
        await sql`
      DELETE FROM articles
      WHERE slug = ${slug};
    `;

        return { success: true };
    } catch (error) {
        console.error('Error deleting article:', error);
        return { success: false, error: 'Failed to delete article' };
    }
}
