export default function Podcast() {
    return (
        <div className="container" style={{ padding: 'var(--space-8) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="hover-card" style={{ maxWidth: '600px', width: '100%', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', borderStyle: 'dashed', borderColor: 'var(--color-border)', backgroundColor: 'transparent' }}>

                {/* Placeholder Icon */}
                <div style={{ width: '64px', height: '64px', margin: '0 auto var(--space-6) auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-main)', borderRadius: '50%', border: '2px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <span style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>🎙️</span>
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>Próximamente</h1>

                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Nuestro equipo se encuentra trabajando en la primera temporada del podcast institucional del CEIC, donde entrevistaremos a expertos y analizaremos a fondo la coyuntura internacional. ¡Mantente atento!
                </p>
            </div>
        </div>
    );
}
