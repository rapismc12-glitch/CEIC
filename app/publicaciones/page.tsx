import Link from 'next/link';

export default function Publicaciones() {
    const lineasPlaceholder = [
        "Geopolítica contemporánea",
        "Economía internacional",
        "Cooperación y desarrollo internacional",
        "Gobernanza global",
        "Políticas públicas y seguridad internacional"
    ];

    return (
        <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '1000px', margin: '0 auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>Publicaciones Académicas</h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                    Archivo de reportes, análisis y *briefs* desarrollados por nuestro equipo.
                </p>
            </div>

            {/* Grid de placeholders por línea */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>

                {lineasPlaceholder.map((linea, index) => (
                    <div key={index} className="hover-card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-bg-secondary)', borderStyle: 'dashed', textAlign: 'center', display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
                        <h3 style={{ color: 'var(--color-base-darker)', marginBottom: 'var(--space-4)', fontSize: '1.125rem' }}>{linea}</h3>

                        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
                                "Próximamente se publicarán investigaciones relacionadas con esta línea de investigación."
                            </p>
                        </div>

                        <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                            <Link href="/investigacion" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
                                ← Regresar a Investigación
                            </Link>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}
