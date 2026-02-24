import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoContainer} style={{ textDecoration: 'none' }}>
        <Image
          src="/images/logo-cuadrado.png"
          alt="CEIC Logo"
          width={40}
          height={40}
          style={{ borderRadius: '50%', marginRight: 'var(--space-2)' }}
        />
        <div className={styles.logo}>CEIC</div>
      </Link>
      <ul className={styles.navLinks}>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/investigacion">Investigación</Link></li>
        <li><Link href="/publicaciones">Publicaciones</Link></li>
        <li><Link href="/podcast">Podcast</Link></li>
        <li><Link href="/sobre-ceic">Sobre CEIC</Link></li>
        <li><Link href="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}
