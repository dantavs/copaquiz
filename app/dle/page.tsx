import Header from '../components/Header';
import Footer from '../components/Footer';
import DleGame from '../components/DleGame';

export const metadata = {
  title: "Dle Copa 2026 - Adivinhe o Jogador",
  description: "Teste seus conhecimentos e adivinhe o jogador secreto da Copa do Mundo 2026 estilo Wordle!",
};

export default function DlePage() {
  return (
    <>
      <Header />
      <main style={{ padding: '4rem 0' }}>
        <div className="container">
          <DleGame />
        </div>
      </main>
      <Footer />
    </>
  );
}
