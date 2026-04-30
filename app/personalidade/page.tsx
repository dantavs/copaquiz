import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizCard from '../components/QuizCard';
import { quizzes } from '../data/quizzes';

export const metadata = {
  title: "Quizzes de Personalidade - Copa Quiz",
  description: "Descubra qual jogador da Copa do Mundo você seria ou qual seleção combina mais com seu estilo.",
};

export default function PersonalidadePage() {
  const personalityQuizzes = quizzes.filter(q => q.type === 'personality');

  return (
    <>
      <Header />
      <main className="animate-pop" style={{ width: '100%', padding: '4rem 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
              Testes de <span className="text-gradient">Personalidade</span>
            </h1>
            <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px' }}>
              Responda com sinceridade e descubra quem você seria no universo do futebol internacional.
            </p>
          </section>

          <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2.5rem',
            width: '100%',
          }}>
            {personalityQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
