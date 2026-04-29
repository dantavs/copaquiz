import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container animate-pop">
        <section className="glass" style={{ padding: '3rem', borderRadius: 'var(--border-radius)', marginTop: '2rem' }}>
          <h1>Política de Privacidade</h1>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>Última atualização: 28 de Abril de 2026</p>
          
          <div style={{ lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>1. Informações Coletadas</h2>
              <p>O CopaQuiz não coleta informações de identificação pessoal sem o seu consentimento. Podemos coletar dados anônimos de navegação para melhorar a experiência do usuário e exibir anúncios relevantes.</p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>2. Uso de Cookies</h2>
              <p>Utilizamos cookies para personalizar conteúdo e anúncios, fornecer recursos de mídia social e analisar nosso tráfego. Também compartilhamos informações sobre o uso do nosso site com nossos parceiros de mídia social, publicidade e análise.</p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>3. Google AdSense</h2>
              <p>Como fornecedor terceirizado, o Google utiliza cookies para exibir anúncios no nosso site. O uso do cookie DART pelo Google permite que ele exiba anúncios para nossos usuários com base em suas visitas a este e outros sites na Internet.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
