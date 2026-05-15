import { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import DailyCountdown from './components/DailyCountdown';

export const metadata: Metadata = {
  title: 'CopaQuiz | O maior desafio da Copa do Mundo',
  description: 'Teste seus conhecimentos sobre a Copa do Mundo com quizzes, trivia e desafios diários!',
  openGraph: {
    title: 'CopaQuiz | O maior desafio da Copa do Mundo',
    description: 'Teste seus conhecimentos sobre a Copa do Mundo com quizzes, trivia e desafios diários!',
  },
};

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
          <section style={{ width: '100%', marginTop: '1.4rem', maxWidth: '980px' }}>
            <div className={styles.mainEntriesGrid}>
              <Link href="/quem-e" className={`${styles.entryCard} ${styles.entryGreen}`}>
                <div className={styles.entryImage}>
                  <Image
                    src="/images/cta-adivinhe-jogador.png"
                    alt="Adivinhe o Jogador"
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div className={styles.entryContent}>
                  <h3>ADIVINHE <span>O JOGADOR</span></h3>
                  <p>Descubra o craque secreto com dicas e poucas tentativas.</p>
                </div>
              </Link>

              <Link href="/quizzes" className={`${styles.entryCard} ${styles.entryBlue}`}>
                <div className={styles.entryImage}>
                  <Image
                    src="/images/cta-quiz-da-copa.png"
                    alt="Quiz da Copa"
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.entryContent}>
                  <h3>QUIZ <span>DA COPA</span></h3>
                  <p>Teste seu conhecimento sobre história, jogos e seleções.</p>
                </div>
              </Link>

              <Link href="/quiz/simulador" className={`${styles.entryCard} ${styles.entryGold}`}>
                <div className={styles.entryImage}>
                  <Image
                    src="/images/cta-simulador-da-copa.png"
                    alt="Simulador da Copa 2026"
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.entryContent}>
                  <h3>SIMULADOR <span>DA COPA 2026</span></h3>
                  <p>Monte cenários e descubra seu campeão da Copa do Mundo.</p>
                </div>
              </Link>
            </div>

            <div className={styles.secondaryEntriesGrid} style={{ marginTop: '1rem' }}>
              <div className={`${styles.entryCard} ${styles.secondaryCard} ${styles.entryGreen} ${styles.secondaryCompact}`}>
                <div className={styles.entryContent}>
                  <h3>🏆 RANKING <span>GLOBAL</span></h3>
                  <p>Em breve: compare sua performance com outros jogadores.</p>
                </div>
              </div>

              <div className={`${styles.entryCard} ${styles.secondaryCard} ${styles.entryGreen} ${styles.secondaryCompact}`}>
                <div className={styles.entryContent}>
                  <h3>📅 DESAFIO <span>DIÁRIO</span></h3>
                  <p>Novo desafio em <DailyCountdown /></p>
                </div>
              </div>
            </div>
          </section>

          </div>
        </main>

        <Footer />
      </>
  );
}
