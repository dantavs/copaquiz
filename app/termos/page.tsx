import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container animate-pop">
        <section className="glass" style={{ padding: '3rem', borderRadius: 'var(--border-radius)', marginTop: '2rem' }}>
          <h1>Termos de Uso</h1>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>Última atualização: 28 de Abril de 2026</p>
          
          <div style={{ lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>1. Aceitação dos Termos</h2>
              <p>Ao acessar o CopaQuiz, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>2. Uso de Licença</h2>
              <p>O conteúdo deste site é para uso pessoal e não comercial. Você não pode modificar, copiar ou usar o material para fins comerciais sem autorização prévia.</p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>3. Isenção de Responsabilidade</h2>
              <p>Os materiais no site do CopaQuiz são fornecidos 'como estão'. Não oferecemos garantias, expressas ou implícitas, e por este meio isentamos e negamos todas as outras garantias.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
