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
        justifyContent: 'center', // Centraliza o logo agora que não há links
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
      </div>
    </header>
  );
}
