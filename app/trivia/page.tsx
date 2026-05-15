import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizCard from '../components/QuizCard';
import { quizzes } from '../data/quizzes';

export const metadata: Metadata = {
  title: "Quizzes Trivia de Futebol | CopaQuiz",
  description: "Teste seus conhecimentos técnicos sobre futebol, seleções e a Copa do Mundo em nossos quizzes de trivia.",
  openGraph: {
    title: "Quizzes Trivia de Futebol | CopaQuiz",
    description: "Teste seus conhecimentos técnicos sobre futebol, seleções e a Copa do Mundo em nossos quizzes de trivia.",
  },
};

export default function TriviaPage() {
  const triviaQuizzes = quizzes.filter(q => q.type === 'trivia');

  return (
    <>
      <Header />
      <main className="animate-pop" style={{ width: '100%', padding: '4rem 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
              Quizzes <span className="text-gradient">Trivia</span>
            </h1>
            <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '600px' }}>
              Perguntas e respostas para os verdadeiros especialistas em futebol. Você é um deles?
            </p>
          </section>

          <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2.5rem',
            width: '100%',
          }}>
            {triviaQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
