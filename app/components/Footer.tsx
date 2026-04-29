import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      padding: '4rem 0 2rem 0',
      textAlign: 'center',
      opacity: 0.8,
      fontSize: '0.9rem',
      width: '100%'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: 0
          }}>
            <li><Link href="/privacidade" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>Privacidade</Link></li>
            <li><Link href="/termos" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>Termos de Uso</Link></li>
            <li><Link href="/contato" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>Contato</Link></li>
          </ul>
        </nav>
        
        <div style={{ opacity: 0.5 }}>
          <p>&copy; 2026 CopaQuiz - Todos os direitos reservados ⚽</p>
        </div>
      </div>
    </footer>
  );
}
