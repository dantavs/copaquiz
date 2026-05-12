import Link from 'next/link';
import { Quiz } from '../data/quizzes';

interface QuizCardProps {
  quiz: Quiz;
  /** Quando definido, o card inteiro se torna um link para esta URL */
  href?: string;
}

export default function QuizCard({ quiz, href }: QuizCardProps) {
  const content = (
    <>
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, var(--secondary), var(--primary))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '4rem',
        textShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}>
        {quiz.emoji || '⚽'}
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: 'rgba(0, 223, 94, 0.1)',
            padding: '4px 8px',
            borderRadius: '6px'
          }}>{quiz.category}</span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '20px',
            background: quiz.difficulty === 'Fácil' ? '#22c55e' : quiz.difficulty === 'Médio' ? '#eab308' : '#ef4444',
            color: 'white'
          }}>{quiz.difficulty}</span>
        </div>
        <h3 style={{ marginBottom: '0.8rem', fontSize: '1.5rem' }}>{quiz.title}</h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--foreground)',
          opacity: 0.7,
          marginBottom: '1.5rem',
          flex: 1
        }}>{quiz.description}</p>
        {!href && (
          <Link href={`/quiz/${quiz.id}`} className="btn btn-primary" style={{ width: '100%' }}>
            Jogar Agora ⚡
          </Link>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="glass animate-pop" style={{
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        transition: 'var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        flex: '1 1 300px',
        maxWidth: '350px',
        width: '100%'
      }}>
        {content}
      </Link>
    );
  }

  return (
    <div className="glass animate-pop" style={{
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      cursor: 'pointer',
      flex: '1 1 300px',
      maxWidth: '350px',
      width: '100%'
    }}>
      {content}
    </div>
  );
}
