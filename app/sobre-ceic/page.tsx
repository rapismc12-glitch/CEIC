import Link from 'next/link';

export default function SobreCEIC() {
    return (
        <div className="container" style={{ padding: 'var(--space-8) 0', maxWidth: '1200px', margin: '0 auto' }}>

            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>Identidad Institucional</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
                    El CEIC es un centro de investigación universitario estudiantil, con carácter académico y sin fines de lucro, dedicado al análisis riguroso de fenómenos internacionales contemporáneos.
                </p>
            </div>

            {/* Grid Layout Principal */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 'var(--space-8)', alignItems: 'start', marginBottom: 'var(--space-12)' }}>

                {/* Columna Izquierda: Identidad, Misión, Visión, Valores */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

                    <section>
                        <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>Nuestra Identidad</h2>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                            El CEIC se define como un espacio académico interdisciplinario, inclusivo y orientado a la investigación. Su identidad se basa en la rigurosidad científica, el pensamiento crítico, la colaboración responsable y el compromiso con el análisis profundo de fenómenos internacionales.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>Misión y Visión</h2>
                        <div className="hover-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
                            <h3 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--color-base-darker)' }}>Misión</h3>
                            <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>El CEIC tiene como misión generar investigación académica rigurosa sobre fenómenos internacionales contemporáneos, fomentando la formación de estudiantes investigadores con pensamiento crítico, capacidad analítica avanzada y compromiso con la excelencia académica. Además, busca crear espacios de discusión y colaboración interdisciplinaria que contribuyan al desarrollo del conocimiento y la difusión de análisis confiables y fundamentados.</p>
                        </div>
                        <div className="hover-card" style={{ padding: 'var(--space-6)' }}>
                            <h3 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--color-base-darker)' }}>Visión</h3>
                            <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>El CEIC aspira a consolidarse como referente académico estudiantil en estudios internacionales a nivel nacional e internacional, reconocido por la calidad de sus investigaciones, la pertinencia de sus publicaciones y la formación de investigadores capaces de abordar problemas globales desde una perspectiva crítica, ética y estratégica.</p>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>Valores Fundamentales y Principios</h2>
                        <div className="hover-card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-bg-secondary)' }}>
                            <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--color-text-secondary)', lineHeight: 1.8, margin: 0 }}>
                                <li><strong>Rigor académico:</strong> Todas las investigaciones cumplen estándares metodológicos exigentes.</li>
                                <li><strong>Pluralidad:</strong> Promueve perspectivas diversas y análisis multidisciplinario.</li>
                                <li><strong>Responsabilidad analítica:</strong> Cada investigación se realiza con ética, precisión y objetividad.</li>
                                <li><strong>Colaboración:</strong> El trabajo conjunto potencia la calidad y relevancia de los resultados.</li>
                                <li><strong>Transparencia y difusión:</strong> Los resultados se publican y comparten con la comunidad académica.</li>
                            </ul>
                            <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                                <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 'var(--space-2)' }}>Principios del Centro:</p>
                                <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '0.9rem' }}>
                                    <li>Compromiso con la investigación académica de alto nivel.</li>
                                    <li>Respeto por la ética profesional y la confidencialidad de los datos.</li>
                                    <li>Fomento de la formación integral del estudiante-investigador.</li>
                                    <li>Contribución a la sociedad mediante análisis y publicaciones relevantes.</li>
                                    <li>Integridad, responsabilidad y excelencia en todas las acciones del centro.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Columna Derecha: Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

                    {/* Tarjeta de Datos Institucionales */}
                    <div style={{ backgroundColor: 'var(--color-base-darker)', color: 'var(--color-bg-main)', padding: 'var(--space-6)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ color: 'var(--color-bg-main)', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                            Datos Institucionales
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: '0.9rem' }}>
                            <div>
                                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fundación</span>
                                <span style={{ fontWeight: 600 }}>Febrero 2026</span>
                            </div>
                            <div>
                                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</span>
                                <span style={{ fontWeight: 600 }}>Think Tank Académico</span>
                            </div>
                            <div>
                                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Áreas de Enfoque</span>
                                <span style={{ fontWeight: 600 }}>5</span>
                            </div>
                            <div>
                                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sede</span>
                                <span style={{ fontWeight: 600 }}>Universitaria</span>
                            </div>
                            <div>
                                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Afiliación</span>
                                <span style={{ fontWeight: 600 }}>Red Universitaria de Centros de Investigación Estudiantil (RUCIE)</span>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Enlace a Equipo */}
                    <div className="hover-card" style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--color-primary)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)' }}>Nuestro Equipo</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                            Conoce a los directores, investigadores y analistas que conforman el CEIC.
                        </p>
                        <Link href="/equipo" style={{ display: 'inline-block', backgroundColor: 'var(--color-primary)', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                            Conoce nuestro equipo →
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}
