import { Metadata } from 'next';
import { quizzes } from '../../data/quizzes';
import Header from '../../components/Header';
import QuizEngine from '../../components/QuizEngine';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const quiz = quizzes.find(q => q.id === id);
  
  if (!quiz) return {};

  return {
    title: `${quiz.title} | CopaQuiz`,
    description: quiz.description,
    openGraph: {
      title: `Você conhece tudo de Copa?`,
      description: `Tente acertar todas as perguntas sobre ${quiz.title}! ⚽🏆`,
      images: [
        {
          url: '/og-img.png',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: quiz.title,
      description: quiz.description,
    },
  };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = quizzes.find(q => q.id === id);

  if (!quiz) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{quiz.title}</h1>
          <div style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', opacity: 0.7 }}>
            <span>{quiz.category}</span>
            <span>•</span>
            <span>{quiz.difficulty}</span>
          </div>
        </div>

        <QuizEngine quiz={quiz} />

        {/* Ad Placeholder */}
        <div className="glass" style={{
          padding: '1rem',
          textAlign: 'center',
          borderRadius: 'var(--border-radius)',
          marginTop: '3rem',
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

export async function generateStaticParams() {
  return quizzes.map((quiz) => ({
    id: quiz.id,
  }));
}
