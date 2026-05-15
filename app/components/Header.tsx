import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.5rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/copaquiz_logo_verdeNeon_h.png" 
            alt="CopaQuiz Logo" 
            width={220} 
            height={70} 
            priority
            style={{ display: 'block' }}
          />
        </Link>
        <nav>
          <Link href="/blog" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
