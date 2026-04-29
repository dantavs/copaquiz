'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/mzdyngoq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
        setStatus('idle');
      }
    } catch (error) {
      alert('Erro de conexão. Verifique sua internet.');
      setStatus('idle');
    }
  };

  return (
    <>
      <Header />
      <main className="container animate-pop">
        <section className="glass" style={{ padding: '3rem', borderRadius: 'var(--border-radius)', marginTop: '2rem', maxWidth: '700px', margin: '2rem auto' }}>
          <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem' }}>Fale Conosco</h1>
          <p style={{ textAlign: 'center', marginBottom: '2.5rem', opacity: 0.8 }}>Dúvidas, sugestões ou parcerias? Envie sua mensagem abaixo.</p>
          
          {status === 'success' ? (
            <div className="animate-pop" style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Mensagem Enviada!</h2>
              <p>Obrigado pelo contato. Verifique sua caixa de e-mail em breve ⚽</p>
              <button onClick={() => setStatus('idle')} className="btn" style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Nome Completo</label>
                <input 
                  name="name"
                  type="text" 
                  required 
                  placeholder="Seu nome"
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    outline: 'none',
                    transition: 'var(--transition)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>E-mail</label>
                <input 
                  name="email"
                  type="email" 
                  required 
                  placeholder="exemplo@email.com"
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    outline: 'none',
                    transition: 'var(--transition)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Assunto</label>
                <select 
                  name="subject"
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    outline: 'none',
                    transition: 'var(--transition)',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <option value="duvida" style={{ color: 'black' }}>Dúvida sobre o Quiz</option>
                  <option value="sugestao" style={{ color: 'black' }}>Sugestão de novo tema</option>
                  <option value="parceria" style={{ color: 'black' }}>Anúncios / Parcerias</option>
                  <option value="outro" style={{ color: 'black' }}>Outros</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mensagem</label>
                <textarea 
                  name="message"
                  required 
                  rows={5}
                  placeholder="Escreva sua mensagem aqui..."
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    outline: 'none',
                    transition: 'var(--transition)',
                    resize: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem ⚡'}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
