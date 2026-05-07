'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize useChat with local storage
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [], // Will be hydrated in useEffect
    onFinish: (message) => {
      // Save to local storage when message is complete
      const currentMessages = JSON.parse(localStorage.getItem('copaquiz_chat_history') || '[]');
      localStorage.setItem('copaquiz_chat_history', JSON.stringify([...currentMessages, message]));
    }
  });

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('copaquiz_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
  }, [setMessages]);

  // Update local storage when user sends a message
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    const currentMessages = JSON.parse(localStorage.getItem('copaquiz_chat_history') || '[]');
    localStorage.setItem('copaquiz_chat_history', JSON.stringify([...currentMessages, userMessage]));
    
    handleSubmit(e);
  };

  const clearChat = () => {
    if (confirm('Tem certeza que deseja apagar o histórico da conversa?')) {
      setMessages([]);
      localStorage.removeItem('copaquiz_chat_history');
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: '#121214',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'transform 0.2s',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
        aria-label="Abrir chat de ajuda"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} fill="currentColor" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="glass"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '350px',
            maxWidth: 'calc(100vw - 48px)',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9998,
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }}></div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Assistente CopaQuiz</h3>
            </div>
            <button onClick={clearChat} title="Limpar conversa" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex' }}>
              <Trash2 size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.length === 0 ? (
              <div style={{ margin: 'auto', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
                <MessageCircle size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>Olá! Sou o assistente do CopaQuiz.</p>
                <p>Como posso te ajudar com o jogo hoje?</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  color: m.role === 'user' ? '#121214' : 'var(--foreground)',
                  padding: '0.8rem 1rem',
                  borderRadius: '16px',
                  borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: m.role === 'user' ? '16px' : '4px',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap'
                }}>
                  {m.content}
                </div>
              ))
            )}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.05)',
                padding: '0.8rem 1rem',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px',
                fontSize: '0.9rem',
                opacity: 0.7
              }}>
                <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Digite sua dúvida..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '0.6rem 1rem',
                borderRadius: '24px',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: input.trim() && !isLoading ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: input.trim() && !isLoading ? '#121214' : 'rgba(255,255,255,0.3)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !isLoading ? 'pointer' : 'default',
                transition: 'background 0.2s'
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
        .typing-dot { animation: blink 1.4s infinite both; font-size: 1.2rem; font-weight: bold; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}} />
    </>
  );
}
