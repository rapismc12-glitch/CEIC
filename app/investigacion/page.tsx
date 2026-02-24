import Link from 'next/link';

export default function Investigacion() {
    const lineas = [
        {
            titulo: "Geopolítica contemporánea",
            descripcion: "Análisis de dinámicas de poder y relaciones internacionales actuales."
        },
        {
            titulo: "Economía internacional",
            descripcion: "Estudio de comercio, integración económica y tendencias globales."
        },
        {
            titulo: "Cooperación y desarrollo internacional",
            descripcion: "Evaluación de políticas y mecanismos de cooperación global."
        },
        {
            titulo: "Gobernanza global",
            descripcion: "Investigación sobre instituciones multilaterales y arquitectura internacional."
        },
        {
            titulo: "Políticas públicas y seguridad internacional",
            descripcion: "Análisis de políticas nacionales e internacionales que impactan la seguridad global."
        }
    ];

    return (
        <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '1000px', margin: '0 auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>Líneas de Investigación</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                    El CEIC articula su trabajo académico en torno a cinco ejes fundamentales que estructuran nuestros análisis y proyectos.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {lineas.map((linea, index) => (
                    <div key={index} className="hover-card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>
                            {index + 1}. {linea.titulo}
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', lineHeight: 1.6, margin: 0 }}>
                            {linea.descripcion}
                        </p>
                        <div style={{ marginTop: 'var(--space-6)' }}>
                            <Link href="/publicaciones" style={{ display: 'inline-block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', backgroundColor: 'rgba(86, 18, 105, 0.05)', padding: '6px 16px', borderRadius: '4px', textDecoration: 'none' }}>
                                Ver publicaciones de esta área →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
