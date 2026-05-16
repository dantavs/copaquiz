import Header from '../components/Header';
import Footer from '../components/Footer';
import StickerGrid from '../components/collector/StickerGrid';

export const metadata = {
  title: 'CopaCollector 2026 | CopaQuiz',
  description: 'Gerencie sua coleção de figurinhas da Copa do Mundo 2026.',
};

export default function CollectorPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ minHeight: '70vh', padding: '2rem 1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          🏅 CopaCollector 2026
        </h1>
        <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '2rem' }}>
          Gerencie sua coleção de figurinhas da Copa do Mundo!
        </p>
        <StickerGrid />
      </main>
      <Footer />
    </>
  );
}
