import Header from './components/Header';
import Footer from './components/Footer';
import QuizCard from './components/QuizCard';
import { quizzes } from './data/quizzes';
import Link from 'next/link';

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
          <section style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem', maxWidth: '800px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
              fontWeight: 900
            }}>
              Quiz de Futebol: <br />
              <span className="text-gradient">Teste seus conhecimentos sobre Copa do Mundo</span>
            </h1>

            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)', textAlign: 'left', lineHeight: 1.6 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Você consegue adivinhar qual é o jogador apenas com algumas dicas?</h2>
              <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                O <strong>Copa Quiz</strong> é um jogo online com perguntas e respostas sobre futebol, onde você pode se desafiar em diferentes modos de jogo.
              </p>
              <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                Aqui você encontra quizzes no formato trivia, com perguntas sobre seleções, jogadores e competições, além de quizzes de personalidade, que revelam qual jogador combina mais com você.
              </p>
              <p style={{ fontWeight: 700, color: 'var(--secondary)' }}>
                Jogue agora e descubra o quanto você realmente sabe sobre futebol!
              </p>
            </div>
          </section>

          {/* Featured Dle Game Mode */}
          <section style={{ marginBottom: '4rem', width: '100%', maxWidth: '800px' }}>
            <Link href="/quem-e" className="glass animate-pop" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '2rem', 
              borderRadius: '24px',
              textDecoration: 'none',
              color: 'white',
              border: '2px solid var(--primary)',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
              gap: '2rem',
              transition: 'transform 0.3s'
            }}>
              <div style={{ fontSize: '4rem' }}>🧩</div>
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>NOVO MODO: Adivinhe o Jogador</h3>
                <p style={{ opacity: 0.8 }}>Teste sua inteligência no estilo Wordle! Você tem 6 tentativas para descobrir quem é o craque secreto.</p>
                <div style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>Jogar agora →</div>
              </div>
            </Link>
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

          {/* SEO Content Section After Quizzes */}
          <section className="glass" style={{
            padding: '3rem',
            borderRadius: 'var(--border-radius)',
            marginTop: '2rem',
            marginBottom: '4rem',
            lineHeight: 1.8,
            width: '100%',
            maxWidth: '900px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem' }}>⚙️ Como funciona o quiz</h2>
                <p>O jogo é simples, mas desafiador:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>Você precisa adivinhar um jogador secreto</li>
                  <li>A cada tentativa, novas informações são reveladas</li>
                  <li>As dicas incluem: <strong>posição em campo, país, clube atual e idade</strong></li>
                  <li>Quanto menos tentativas, melhor sua pontuação</li>
                </ul>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.8 }}>Esse formato é inspirado em jogos populares de adivinhação, mas totalmente focado no universo do futebol.</p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem' }}>🌍 Sobre a Copa do Mundo 2026</h2>
                <p>A Copa do Mundo de 2026 promete ser uma das maiores da história, com seleções de alto nível e jogadores de elite do futebol mundial.</p>
                <p>Pensando nisso, o <strong>Copa Quiz</strong> reúne atletas que têm grande chance de participar do torneio, tornando o jogo ainda mais relevante e atualizado. Se você acompanha futebol internacional, este quiz é perfeito para testar seu conhecimento.</p>
              </div>

              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem' }}>🧩 Outros quizzes de futebol</h2>
                <p>Explore outros desafios:</p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyle: 'none' }}>
                  <li>🇧🇷 Quiz de jogadores da seleção brasileira</li>
                  <li>🔥 Quiz de futebol difícil (nível hard)</li>
                  <li>🌎 Quiz de clubes e ligas internacionais</li>
                </ul>
                <p style={{ marginTop: '1rem', fontWeight: 700, color: 'var(--secondary)' }}>👉 Em breve novos modos de jogo!</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem' }}>🏆 Por que jogar o Copa Quiz?</h2>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
                  <li>✅ 100% gratuito</li>
                  <li>✅ Atualizado com jogadores reais</li>
                  <li>✅ Ideal para fãs de futebol</li>
                  <li>✅ Perfeito para desafiar amigos</li>
                  <li>✅ Funciona no celular e computador</li>
                </ul>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem' }}>📣 Compartilhe seu resultado</h2>
                <p>Acertou rápido? Então compartilhe seu resultado com seus amigos e veja quem entende mais de futebol! Você pode jogar todos os dias e tentar melhorar sua pontuação.</p>
              </div>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
