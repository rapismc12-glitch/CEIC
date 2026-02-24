import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'var(--space-8) var(--space-4)', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>

                {/* Logo y Nombre */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                        <Image src="/images/logo-cuadrado.png" alt="CEIC Logo" width={32} height={32} style={{ borderRadius: '50%' }} />
                        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>CEIC</span>
                    </div>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 'var(--space-2)' }}>
                        Centro de Estudios Internacionales Contemporáneos
                    </p>
                    <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        Formando investigadores con visión global
                    </p>
                </div>

                {/* Enlaces Rápidos */}
                <div>
                    <h4 style={{ color: 'var(--color-text-main)', marginBottom: 'var(--space-4)' }}>Enlaces Rápidos</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <li><Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Inicio</Link></li>
                        <li><Link href="/investigacion" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Investigación</Link></li>
                        <li><Link href="/publicaciones" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Publicaciones</Link></li>
                        <li><Link href="/podcast" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Podcast</Link></li>
                        <li><Link href="/sobre-ceic" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Sobre CEIC</Link></li>
                        <li><Link href="/equipo" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Conoce nuestro equipo</Link></li>
                        <li><Link href="/contacto" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Contacto</Link></li>
                    </ul>
                </div>

                {/* Aviso Legal y Contacto */}
                <div>
                    <h4 style={{ color: 'var(--color-text-main)', marginBottom: 'var(--space-4)' }}>Contacto y Legal</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                        <strong>Contacto:</strong> <a href="mailto:saul95668@gmail.com" style={{ color: 'var(--color-primary)' }}>saul95668@gmail.com</a> | <strong>Tel:</strong> 222 908 4034
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginTop: 'var(--space-4)' }}>
                        <p style={{ marginBottom: 'var(--space-2)' }}>
                            <Link href="/aviso-privacidad" style={{ color: 'inherit', fontWeight: 'bold' }}>Aviso de Privacidad</Link>
                        </p>
                        <p>
                            <Link href="/aviso-legal" style={{ color: 'inherit', fontWeight: 'bold' }}>Aviso Legal</Link>
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
