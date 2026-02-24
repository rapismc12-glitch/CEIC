export default function AvisoPrivacidad() {
    return (
        <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-8)' }}>Aviso de Privacidad</h1>

            <div className="hover-card" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

                <div style={{ backgroundColor: 'rgba(86, 18, 105, 0.05)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-primary)', borderRadius: '4px' }}>
                    <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 500 }}>
                        Los datos personales proporcionados serán usados únicamente para fines académicos y de contacto institucional, tratados con confidencialidad y conforme a la legislación vigente.
                    </p>
                </div>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        1. Datos personales
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        El CEIC recolecta y procesa datos personales proporcionados por estudiantes, colaboradores o visitantes con fines académicos e institucionales, como nombres, correos electrónicos, institución educativa, área de interés y experiencia relevante.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        2. Finalidad del tratamiento
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-2)' }}>
                        Los datos se utilizan únicamente para:
                    </p>
                    <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: 'var(--space-4)', lineHeight: 1.6, margin: 0 }}>
                        <li>Procesos de aplicación y admisión.</li>
                        <li>Coordinación de proyectos de investigación y difusión académica.</li>
                        <li>Contacto institucional y comunicación sobre actividades del centro.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        3. Confidencialidad y seguridad
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        El CEIC asegura que los datos serán tratados de manera confidencial y protegidos mediante medidas de seguridad técnicas y administrativas.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        4. Derechos de los titulares
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        Los interesados pueden ejercer sus derechos de acceso, rectificación, cancelación y oposición (ARCO) enviando solicitud a: <a href="mailto:saul95668@gmail.com" style={{ color: 'var(--color-primary)' }}>saul95668@gmail.com</a>
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        5. Transferencia de datos
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        No se transfieren datos personales a terceros sin consentimiento, salvo obligación legal o contractual estricta para fines académicos.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        6. Vigencia
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        El presente aviso aplica desde su publicación en el sitio web del CEIC y se mantendrá vigente hasta su actualización.
                    </p>
                </section>

                <section style={{ marginTop: 'var(--space-4)', backgroundColor: 'var(--color-bg-main)', padding: 'var(--space-4)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-main)', fontWeight: 600, margin: '0 0 var(--space-2) 0' }}>Para dudas o información:</p>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.875rem' }}>
                        <span style={{ display: 'block' }}>Email: <a href="mailto:saul95668@gmail.com" style={{ color: 'var(--color-primary)' }}>saul95668@gmail.com</a></span>
                        <span style={{ display: 'block' }}>Tel: <a href="tel:+522229084034" style={{ color: 'var(--color-primary)' }}>222 908 4034</a></span>
                    </p>
                </section>
            </div>
        </div>
    );
}
