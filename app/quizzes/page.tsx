import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizCard from '../components/QuizCard';
import { quizzes } from '../data/quizzes';
import styles from './quizzes.module.css';

export const metadata: Metadata = {
  title: 'Todos os Quizzes | CopaQuiz',
  description: 'Escolha qual desafio da Copa do Mundo você quer enfrentar!',
  openGraph: {
    title: 'Todos os Quizzes | CopaQuiz',
    description: 'Escolha qual desafio da Copa do Mundo você quer enfrentar!',
  },
};

// IDs de quizzes que NÃO devem aparecer na listagem
const EXCLUDED_IDS = ['simulador', 'adivinhe-jogador'];

export default function QuizzesPage() {
  const filteredQuizzes = quizzes.filter(
    (quiz) => !EXCLUDED_IDS.includes(quiz.id)
  );

  return (
    <>
      <Header />
      <main className="container" style={{ minHeight: '70vh' }}>
        <Link href="/" className={styles.backLink}>
          ← Voltar para Home
        </Link>

        <h1 className={styles.pageTitle}>Todos os Quizzes</h1>
        <p className={styles.pageSubtitle}>
          Escolha qual desafio da Copa do Mundo você quer enfrentar!
        </p>

        <div className={styles.quizGrid}>
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} href={`/quiz/${quiz.id}`} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
