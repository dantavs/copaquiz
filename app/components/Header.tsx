import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.75rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          textDecoration: 'none'
        }}>
          {/* SVG Icon Logo */}
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v20M2 12h20M12 12l7.07-7.07M4.93 19.07L12 12l-7.07-7.07M19.07 19.07L12 12"></path>
            </svg>
          </div>
          
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1
          }}>
            <span className="text-gradient">Copa</span>
            <span style={{ color: 'var(--foreground)', fontSize: '0.9rem', opacity: 0.8 }}>Quiz 2026</span>
          </span>
        </Link>
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '20px',
            fontWeight: 600
          }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/sobre">Sobre</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
