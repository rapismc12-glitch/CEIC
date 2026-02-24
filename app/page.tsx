import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div style={{ width: '100%', height: '300px', position: 'relative' }}>
        <Image
          src="/images/logo-horizontal.png"
          alt="Banner CEIC"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="container" style={{ padding: 'var(--space-8) 0', marginTop: '-100px', position: 'relative', zIndex: 10 }}>

        {/* Header and Title */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'var(--color-bg-main)', border: '4px solid var(--color-bg-main)', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/images/logo-cuadrado.png"
              alt="Logo CEIC"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{ paddingBottom: 'var(--space-2)' }}>
            <h1 style={{ margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }} className="banner-title">
              Centro de Estudios Internacionales Contemporáneos (CEIC)
            </h1>
          </div>
        </div>

        {/* Eslogan Oficial */}
        <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', fontWeight: 300, color: 'var(--color-primary)' }}>
          Análisis académico riguroso para comprender los fenómenos internacionales contemporáneos
        </p>

        {/* Sobre CEIC Link */}
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-secondary)', borderLeft: '4px solid var(--color-primary)', borderRadius: '4px', marginBottom: 'var(--space-8)' }}>
          <h2 style={{ color: 'var(--color-primary)', marginTop: 0, marginBottom: 'var(--space-2)' }}>Sobre el CEIC</h2>
          <p style={{ margin: 0, marginBottom: 'var(--space-2)' }}>
            El CEIC es un centro de investigación estudiantil interdisciplinario enfocado en el análisis de fenómenos internacionales contemporáneos desde una perspectiva académica rigurosa. Nuestro propósito dentro de la Red Universitaria de Centros de Investigación Estudiantil es fomentar la formación investigadora y generar análisis de alta calidad.
          </p>
          <Link href="/sobre-ceic" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Leer más sobre nuestra misión →</Link>
        </div>

        {/* Líneas de Investigación */}
        <section style={{ marginTop: 'var(--space-12)' }}>
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Líneas de Investigación</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>

            <Link href="/investigacion" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="hover-card" style={{ padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>Geopolítica contemporánea</h3>
                <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1 }}>Análisis de dinámicas de poder y relaciones internacionales actuales.</p>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-block', marginTop: 'var(--space-4)' }}>Ver línea de investigación →</span>
              </div>
            </Link>

            <Link href="/investigacion" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="hover-card" style={{ padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>Economía internacional</h3>
                <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1 }}>Estudio de comercio, integración económica y tendencias globales.</p>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-block', marginTop: 'var(--space-4)' }}>Ver línea de investigación →</span>
              </div>
            </Link>

            <Link href="/investigacion" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="hover-card" style={{ padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>Cooperación y desarrollo internacional</h3>
                <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1 }}>Evaluación de políticas y mecanismos de cooperación global.</p>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-block', marginTop: 'var(--space-4)' }}>Ver línea de investigación →</span>
              </div>
            </Link>

            <Link href="/investigacion" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="hover-card" style={{ padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>Gobernanza global</h3>
                <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1 }}>Investigación sobre instituciones multilaterales y arquitectura internacional.</p>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-block', marginTop: 'var(--space-4)' }}>Ver línea de investigación →</span>
              </div>
            </Link>

            <Link href="/investigacion" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="hover-card" style={{ padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>Políticas públicas y seguridad internacional</h3>
                <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1 }}>Análisis de políticas nacionales e internacionales que impactan la seguridad global.</p>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-block', marginTop: 'var(--space-4)' }}>Ver línea de investigación →</span>
              </div>
            </Link>

          </div>
        </section>

        {/* Call to Action Section Final */}
        <section style={{ marginTop: 'var(--space-12)', textAlign: 'center', backgroundColor: 'var(--color-bg-secondary)', padding: 'var(--space-12) var(--space-4)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
          <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary)', fontSize: '2.25rem' }}>
            ¿Te interesa la investigación en Relaciones Internacionales?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '700px', margin: '0 auto var(--space-8) auto', lineHeight: 1.6 }}>
            Únete a nuestro equipo y participa en discusiones académicas, publicaciones y análisis de alto impacto desde una perspectiva joven, crítica y rigurosa.
          </p>

          <Link href="/contacto" style={{ display: 'inline-block', textDecoration: 'none' }}>
            <button className="submitButton" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>
              Aplica ahora
            </button>
          </Link>
        </section>
      </div>
    </>
  );
}
