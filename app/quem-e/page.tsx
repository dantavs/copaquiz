import Header from '../components/Header';
import Footer from '../components/Footer';
import DleGame from '../components/DleGame';

export const metadata = {
  title: "Quem é o Jogador? - Copa Quiz",
  description: "Teste seus conhecimentos e adivinhe o jogador secreto da Copa do Mundo 2026 no estilo Wordle!",
};

export default function DlePage() {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Game Component */}
          <DleGame />

          {/* Explanation Section */}
          <section className="glass animate-pop" style={{
            marginTop: '4rem',
            padding: '3rem',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '800px',
            lineHeight: 1.6
          }}>
            
            <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>⚽ Adivinhe o Jogador</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              Descubra qual jogador está escondido!<br/>
              Você tem <strong>6 tentativas</strong> e, a cada palpite, recebe pistas para chegar à resposta.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '1rem' }}>🧠 Como jogar</h3>
                <ul style={{ paddingLeft: '1.2rem' }}>
                  <li>Escolha um jogador no campo de busca</li>
                  <li>Envie seu palpite</li>
                  <li>Analise o feedback e tente novamente</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '1rem' }}>🎯 Feedback</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><span style={{ color: '#10b981', fontWeight: 800 }}>🟩 Verde</span> → correto</li>
                  <li><span style={{ color: '#f59e0b', fontWeight: 800 }}>🟨 Amarelo</span> → próximo</li>
                  <li><span style={{ color: '#6b7280', fontWeight: 800 }}>⬜ Cinza</span> → incorreto</li>
                  <li><span style={{ fontWeight: 800 }}>⬆️⬇️ Setas</span> → indicam se a idade/altura é maior ou menor</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '1rem' }}>🎮 Modos de jogo</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><strong>📅 Diário</strong> → mesmo jogador para todos (1 por dia)</li>
                  <li><strong>♾️ Infinito</strong> → jogue quantas vezes quiser</li>
                </ul>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', marginBottom: '3rem' }}>
              <p style={{ margin: 0 }}>
                <strong>💡 Dica:</strong> Use as pistas (país, liga, posição, idade e altura) para eliminar opções e chegar ao jogador certo. Boa sorte! 🍀
              </p>
            </div>

            {/* Example Section */}
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>Exemplo de Jogada</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowX: 'auto' }}>
              <div style={{ minWidth: '600px' }}>
                <ExampleRow name="Neymar" results={['wrong', 'wrong', 'wrong', 'near', 'wrong-up', 'near']} />
                <ExampleRow name="Mbappé" results={['wrong', 'wrong', 'wrong', 'correct', 'wrong-up', 'wrong-down']} />
                <ExampleRow name="Di María" results={['correct', 'wrong', 'wrong', 'correct', 'wrong-down', 'near']} />
                <ExampleRow name="Messi 🎉" results={['correct', 'correct', 'correct', 'correct', 'correct', 'correct']} isWinner />
              </div>
            </div>

          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Mini components for the example section to look like the real game
function ExampleRow({ name, results, isWinner }: { name: string, results: string[], isWinner?: boolean }) {
  const labels = ['País', 'Clube', 'Liga', 'Posição', 'Idade', 'Altura'];
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(7, 1fr)', 
      gap: '8px', 
      marginBottom: '8px',
      opacity: isWinner ? 1 : 0.8
    }}>
      <div className="glass-card" style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', borderColor: isWinner ? '#10b981' : undefined }}>
        {name}
      </div>
      {results.map((res, i) => (
        <ExampleSquare key={i} label={labels[i]} type={res} />
      ))}
    </div>
  );
}

function ExampleSquare({ label, type }: { label: string, type: string }) {
  let bgColor = 'rgba(255,255,255,0.05)';
  if (type === 'correct') bgColor = '#10b981';
  if (type === 'near') bgColor = '#f59e0b';

  let direction = null;
  if (type === 'wrong-up') direction = '↑';
  if (type === 'wrong-down') direction = '↓';

  return (
    <div style={{
      background: bgColor,
      borderRadius: '8px',
      padding: '0.5rem 0.2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50px',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <span style={{ fontSize: '0.65rem', fontWeight: 700, lineHeight: 1.2 }}>{label}</span>
      {direction && (
        <span style={{ fontSize: '1.1rem', marginTop: '1px', fontWeight: 900 }}>{direction}</span>
      )}
    </div>
  );
}
