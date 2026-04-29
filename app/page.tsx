import Header from './components/Header';
import Footer from './components/Footer';
import QuizCard from './components/QuizCard';
import { quizzes } from './data/quizzes';

export default function Home() {
  return (
    <>
      <Header />
      <main className="animate-pop" style={{ width: '100%' }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <section style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              VIVA A EMOÇÃO DA <br />
              <span className="text-gradient">COPA DO MUNDO</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', opacity: 0.8, maxWidth: '650px', margin: '0 auto', fontWeight: 500 }}>
              Você é um verdadeiro craque ou apenas mais um reserva? Teste seus conhecimentos agora!
            </p>
          </section>

          <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2.5rem',
            marginBottom: '4rem',
            width: '100%',
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
            borderStyle: 'dashed',
            width: '100%',
            maxWidth: '800px'
          }}>
            Espaço para Anúncio
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
