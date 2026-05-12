import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobreOCopaQuizPage() {
  return (
    <>
      <Header />
      <main className="container animate-pop">
        <section style={{ maxWidth: '900px', margin: '2rem auto', paddingBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '3rem' }}>
            Sobre o <span className="text-gradient">CopaQuiz</span> e o Futebol
          </h1>

          <div className="glass" style={{
            padding: '3rem',
            borderRadius: 'var(--border-radius)',
            lineHeight: 1.8,
            width: '100%',
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}