export default function AvisoLegal() {
    return (
        <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-8)' }}>Aviso Legal</h1>

            <div className="hover-card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        1. Propiedad Intelectual
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        Todo el contenido del sitio web, incluyendo textos, imágenes, gráficos, videos y bases de datos, es propiedad del CEIC o cuenta con licencias legales. Se prohíbe su reproducción, distribución o modificación sin autorización expresa.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        2. Uso del Sitio
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        El sitio web tiene fines académicos, de investigación y divulgación. No se asume responsabilidad por usos distintos al establecido.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        3. Responsabilidad
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        El CEIC no se hace responsable por daños directos o indirectos derivados del acceso, uso o imposibilidad de acceso a los contenidos del sitio, salvo obligación legal vigente.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        4. Modificaciones
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        El CEIC puede actualizar o modificar las condiciones del sitio web, su contenido y políticas legales en cualquier momento, notificando cuando sea pertinente.
                    </p>
                </section>

                <section style={{ marginTop: 'var(--space-4)', backgroundColor: 'var(--color-bg-main)', padding: 'var(--space-4)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-main)', fontWeight: 600, margin: '0 0 var(--space-2) 0' }}>Contacto Legal:</p>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.875rem' }}>
                        <span style={{ display: 'block' }}>Email: <a href="mailto:saul95668@gmail.com" style={{ color: 'var(--color-primary)' }}>saul95668@gmail.com</a></span>
                        <span style={{ display: 'block' }}>Tel: <a href="tel:+522229084034" style={{ color: 'var(--color-primary)' }}>222 908 4034</a></span>
                    </p>
                </section>
            </div>
        </div>
    );
}
