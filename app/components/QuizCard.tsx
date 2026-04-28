import Link from 'next/link';
import { Quiz } from '../data/quizzes';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className="glass animate-fade-in" style={{
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{
        height: '160px',
        background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem'
      }}>
        {quiz.id === 'historia-copas' ? '🏆' : '🌎'}
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>{quiz.category}</span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '12px',
            background: quiz.difficulty === 'Fácil' ? '#dcfce7' : quiz.difficulty === 'Médio' ? '#fef9c3' : '#fee2e2',
            color: quiz.difficulty === 'Fácil' ? '#166534' : quiz.difficulty === 'Médio' ? '#854d0e' : '#991b1b'
          }}>{quiz.difficulty}</span>
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>{quiz.title}</h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--foreground)',
          opacity: 0.8,
          marginBottom: '1.5rem',
          flex: 1
        }}>{quiz.description}</p>
        <Link href={`/quiz/${quiz.id}`} className="btn btn-primary" style={{ width: '100%' }}>
          Começar Quiz
        </Link>
      </div>
    </div>
  );
}
