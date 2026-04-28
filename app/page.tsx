import Header from './components/Header';
import QuizCard from './components/QuizCard';
import { quizzes } from './data/quizzes';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container animate-fade-in">
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Desafie seu conhecimento sobre a <span className="text-gradient">Copa do Mundo</span>
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Prepare-se para 2026 testando o quanto você sabe sobre a história, os craques e as curiosidades do maior torneio de futebol do planeta.
          </p>
        </section>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </section>

        {/* Ad Placeholder */}
        <div className="glass" style={{
          padding: '1.5rem',
          textAlign: 'center',
          borderRadius: 'var(--border-radius)',
          marginBottom: '2rem',
          color: 'var(--foreground)',
          opacity: 0.5,
          fontSize: '0.8rem',
          borderStyle: 'dashed'
        }}>
          Espaço para Anúncio
        </div>
      </main>

      <footer style={{
        padding: '2rem 0',
        textAlign: 'center',
        opacity: 0.6,
        fontSize: '0.875rem'
      }}>
        <p>&copy; 2026 CopaQuiz - Rumo à Copa 2026 ⚽</p>
      </footer>
    </>
  );
}
