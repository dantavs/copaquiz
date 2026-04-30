'use client';

import { useState, useEffect, useRef } from 'react';
import { Player, players } from '../data/players';
import Link from 'next/link';

// Mapeamento de Continentes para a regra da cor Amarela
const CONTINENTS: Record<string, string> = {
  "Brazil": "South America", "Argentina": "South America", "Uruguay": "South America", "Colombia": "South America",
  "France": "Europe", "England": "Europe", "Spain": "Europe", "Germany": "Europe", "Portugal": "Europe", "Belgium": "Europe", "Italy": "Europe", "Norway": "Europe",
  "Canada": "North America", "USA": "North America", "Mexico": "North America",
  "Morocco": "Africa", "Egypt": "Africa", "Nigeria": "Africa",
  "South Korea": "Asia", "Japan": "Asia"
};

// Categorias de Posição
const POSITION_CATEGORIES: Record<string, 'DEFENSE' | 'ATTACK'> = {
  "Lateral Direito": "DEFENSE", "Lateral Esquerdo": "DEFENSE", "Volante": "DEFENSE", "Zagueiro": "DEFENSE", "Goleiro": "DEFENSE", "Defensor": "DEFENSE",
  "Meio-Campo": "ATTACK", "Meia Ofensivo": "ATTACK", "Ponta Esquerda": "ATTACK", "Ponta Direita": "ATTACK", "Centroavante": "ATTACK", "Atacante": "ATTACK", "Meio-campista": "ATTACK"
};

interface GuessFeedback {
  player: Player;
  checks: {
    country: 'correct' | 'near' | 'wrong';
    club: 'correct' | 'wrong';
    league: 'correct' | 'wrong';
    position: 'correct' | 'near' | 'wrong';
    age: { status: 'correct' | 'near' | 'wrong', direction?: 'up' | 'down' };
    height: { status: 'correct' | 'near' | 'wrong', direction?: 'up' | 'down' };
  }
}

export default function DleGame() {
  const [targetPlayer, setTargetPlayer] = useState<Player | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [guesses, setGuesses] = useState<GuessFeedback[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inicialização do Jogo
  useEffect(() => {
    const saved = localStorage.getItem('copa-dle-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Aqui poderíamos restaurar o estado, mas por simplicidade vamos focar no novo jogo por enquanto
    }
    
    // Sortear jogador do dia (ou da sessão)
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setTargetPlayer(randomPlayer);
  }, []);

  const getFeedback = (guess: Player): GuessFeedback => {
    if (!targetPlayer) return {} as GuessFeedback;

    const checks: GuessFeedback['checks'] = {
      country: guess.country === targetPlayer.country ? 'correct' : (CONTINENTS[guess.country] === CONTINENTS[targetPlayer.country] ? 'near' : 'wrong'),
      club: guess.club === targetPlayer.club ? 'correct' : 'wrong',
      league: guess.league === targetPlayer.league ? 'correct' : 'wrong',
      position: guess.position === targetPlayer.position ? 'correct' : (POSITION_CATEGORIES[guess.position] === POSITION_CATEGORIES[targetPlayer.position] ? 'near' : 'wrong'),
      age: {
        status: guess.age === targetPlayer.age ? 'correct' : (Math.abs(guess.age - targetPlayer.age) <= 2 ? 'near' : 'wrong'),
        direction: guess.age < targetPlayer.age ? 'up' : (guess.age > targetPlayer.age ? 'down' : undefined)
      },
      height: {
        status: guess.height_cm === targetPlayer.height_cm ? 'correct' : (Math.abs(guess.height_cm - targetPlayer.height_cm) <= 5 ? 'near' : 'wrong'),
        direction: guess.height_cm < targetPlayer.height_cm ? 'up' : (guess.height_cm > targetPlayer.height_cm ? 'down' : undefined)
      }
    };

    return { player: guess, checks };
  };

  const handleSelectPlayer = (player: Player) => {
    if (gameState !== 'playing') return;
    
    const feedback = getFeedback(player);
    const newGuesses = [feedback, ...guesses];
    setGuesses(newGuesses);
    setSearchTerm('');
    setShowDropdown(false);

    if (player.name === targetPlayer?.name) {
      setGameState('won');
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
    }
  };

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !guesses.some(g => g.player.name === p.name)
  );

  const getStatusColor = (status: 'correct' | 'near' | 'wrong') => {
    if (status === 'correct') return '#10b981'; // Verde
    if (status === 'near') return '#f59e0b';    // Amarelo
    return 'rgba(255,255,255,0.1)';           // Cinza/Transparente
  };

  const shareResult = () => {
    const emojis = guesses.map(g => {
      const row = [
        g.checks.country === 'correct' ? '🟩' : (g.checks.country === 'near' ? '🟨' : '⬜'),
        g.checks.club === 'correct' ? '🟩' : '⬜',
        g.checks.position === 'correct' ? '🟩' : (g.checks.position === 'near' ? '🟨' : '⬜'),
        g.checks.age.status === 'correct' ? '🟩' : (g.checks.age.status === 'near' ? '🟨' : '⬜'),
      ].join('');
      return row;
    }).reverse().join('\n');

    const text = `*ADIVINHEI O JOGADOR!* ⚽🏆\n\nConsegui descobrir o craque secreto em *${guesses.length}/6* tentativas!\n\n${emojis}\n\n*Duvido você acertar em menos!* 👀`;
    const url = window.location.href;
    const fullText = `${text}\n\nJogue aqui: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'CopaQuiz Dle',
        text: text,
        url: url,
      }).catch(err => console.error('Share failed:', err));
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`, '_blank');
    }
  };

  return (
    <div className="dle-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Game Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Adivinhe o Jogador</h1>
        <p style={{ opacity: 0.7 }}>Quem é o craque secreto da Copa 2026?</p>
      </div>

      {/* Input Area */}
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <input
          type="text"
          className="glass"
          placeholder={gameState === 'playing' ? "Digite o nome de um jogador..." : "Fim de jogo!"}
          disabled={gameState !== 'playing'}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          style={{
            width: '100%',
            padding: '1.2rem',
            fontSize: '1.1rem',
            borderRadius: '12px',
            border: '2px solid rgba(255,255,255,0.1)',
            outline: 'none',
            color: 'white'
          }}
        />

        {showDropdown && searchTerm && (
          <div ref={dropdownRef} className="glass" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            marginTop: '0.5rem',
            maxHeight: '300px',
            overflowY: 'auto',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {filteredPlayers.map(p => (
              <div 
                key={p.name}
                onClick={() => handleSelectPlayer(p)}
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s'
                }}
                className="dropdown-item"
              >
                <span style={{ fontWeight: 700 }}>{p.name}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.6, marginLeft: '0.5rem' }}>{p.club} | {p.country}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Results Overlay */}
      {gameState !== 'playing' && (
        <div className="glass animate-pop" style={{ 
          padding: '2.5rem', 
          borderRadius: '16px', 
          textAlign: 'center', 
          marginBottom: '2rem',
          border: `2px solid ${gameState === 'won' ? 'var(--primary)' : '#ef4444'}`,
          boxShadow: gameState === 'won' ? '0 0 30px rgba(16, 185, 129, 0.2)' : 'none'
        }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
            {gameState === 'won' ? '🎉 Você acertou!' : '💀 Fim de jogo'}
          </h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>O jogador era: <strong style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>{targetPlayer?.name}</strong></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <button onClick={shareResult} className="btn btn-primary" style={{ width: '100%' }}>
              Compartilhar Resultado 🚀
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="btn" 
              style={{ 
                width: '100%',
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }}
            >
              Jogar Novamente 🔄
            </button>
            <Link href="/" className="btn" style={{ background: 'transparent', opacity: 0.6, fontSize: '0.9rem' }}>
              Voltar para a Home
            </Link>
          </div>
        </div>
      )}

      {/* Guesses Table */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '600px' }}>
          {guesses.map((g, i) => (
            <div key={i} className="animate-pop" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '8px', 
              marginBottom: '8px' 
            }}>
              <div className="glass-card" style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                {g.player.name}
              </div>
              <FeedbackSquare label={g.player.country} status={g.checks.country} />
              <FeedbackSquare label={g.player.club} status={g.checks.club} />
              <FeedbackSquare label={g.player.league} status={g.checks.league} />
              <FeedbackSquare label={g.player.position} status={g.checks.position} />
              <FeedbackSquare 
                label={`${g.player.age}a`} 
                status={g.checks.age.status} 
                direction={g.checks.age.direction} 
              />
              <FeedbackSquare 
                label={`${g.player.height_cm}cm`} 
                status={g.checks.height.status} 
                direction={g.checks.height.direction} 
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function FeedbackSquare({ label, status, direction }: { label: string, status: 'correct' | 'near' | 'wrong', direction?: 'up' | 'down' }) {
  const bgColor = status === 'correct' ? '#10b981' : (status === 'near' ? '#f59e0b' : 'rgba(255,255,255,0.05)');
  
  return (
    <div style={{
      background: bgColor,
      borderRadius: '8px',
      padding: '0.8rem 0.4rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60px',
      border: '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.5s ease'
    }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, lineHeight: 1.2 }}>{label}</span>
      {direction && (
        <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>
          {direction === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
  );
}
