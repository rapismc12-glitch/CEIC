export default function Equipo() {
    return (
        <div className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-8)', color: 'var(--color-primary)' }}>Nuestro Equipo</h1>

            <div className="hover-card" style={{ padding: 'var(--space-8)', backgroundColor: 'var(--color-bg-secondary)', marginBottom: 'var(--space-4)', display: 'inline-block', margin: '0 auto var(--space-8) auto', minWidth: '300px' }}>
                <h2 style={{ fontSize: '1.5rem', margin: '0 0 var(--space-2) 0', color: 'var(--color-base-darker)' }}>
                    Yaretzi Cortez Barranco
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-2) 0' }}>
                    Directora del centro
                </p>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-bg-main)', backgroundColor: 'var(--color-primary)', padding: '4px 12px', borderRadius: '4px', display: 'inline-block' }}>
                    CEIC
                </span>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: 'var(--space-4)' }}>
                Próximamente se integrarán más integrantes.
            </p>

        </div>
    );
}
