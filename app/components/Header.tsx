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
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/copaquiz_logo_h.png" 
            alt="CopaQuiz Logo" 
            width={180} 
            height={50} 
            priority
            style={{ objectFit: 'contain' }}
          />
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
