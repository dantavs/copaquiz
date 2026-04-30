'use client';

import { useState, useEffect, useRef } from 'react';
import { Player, players } from '../data/players';
import Link from 'next/link';

// Mapeamento de Continentes para a regra da cor Amarela
const CONTINENTS: Record<string, string> = {
  "Brasil": "South America", "Argentina": "South America", "Uruguai": "South America", "Colômbia": "South America",
  "França": "Europe", "Inglaterra": "Europe", "Espanha": "Europe", "Alemanha": "Europe", "Portugal": "Europe", "Bélgica": "Europe", "Itália": "Europe", "Noruega": "Europe",
  "Canadá": "North America", "EUA": "North America", "Estados Unidos": "North America", "México": "North America",
  "Marrocos": "Africa", "Egito": "Africa", "Nigéria": "Africa",
  "Coreia do Sul": "Asia", "Japão": "Asia"
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

type GameMode = 'daily' | 'endless';

export default function DleGame() {
  const [gameMode, setGameMode] = useState<GameMode>('daily');
  const [targetPlayer, setTargetPlayer] = useState<Player | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [guesses, setGuesses] = useState<GuessFeedback[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [streak, setStreak] = useState(0);
  const [lastStreak, setLastStreak] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Função para obter o jogador do dia (determinística)
  const getDailyPlayer = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = (hash << 5) - hash + dateString.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % players.length;
    return players[index];
  };

  // Carregar estado inicial
  useEffect(() => {
    const dailyKey = `copa-dle-daily-${new Date().toISOString().split('T')[0]}`;
    const endlessKey = 'copa-dle-endless-v1';

    if (gameMode === 'daily') {
      const saved = localStorage.getItem(dailyKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGuesses(parsed.guesses || []);
        setGameState(parsed.status || 'playing');
      } else {
        setGuesses([]);
        setGameState('playing');
      }
      setTargetPlayer(getDailyPlayer());
    } else {
      const saved = localStorage.getItem(endlessKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGuesses(parsed.guesses || []);
        setGameState(parsed.status || 'playing');
        setStreak(parsed.streak || 0);
        setLastStreak(parsed.lastStreak || 0);
        
        if (parsed.targetName) {
          const p = players.find(player => player.name === parsed.targetName);
          setTargetPlayer(p || players[Math.floor(Math.random() * players.length)]);
        } else {
          setTargetPlayer(players[Math.floor(Math.random() * players.length)]);
        }
      } else {
        setGuesses([]);
        setGameState('playing');
        setStreak(0);
        setTargetPlayer(players[Math.floor(Math.random() * players.length)]);
      }
    }
  }, [gameMode]);

  // Salvar estado sempre que mudar
  useEffect(() => {
    if (!targetPlayer) return;

    if (gameMode === 'daily') {
      const dailyKey = `copa-dle-daily-${new Date().toISOString().split('T')[0]}`;
      localStorage.setItem(dailyKey, JSON.stringify({
        guesses,
        status: gameState
      }));
    } else {
      const endlessKey = 'copa-dle-endless-v1';
      localStorage.setItem(endlessKey, JSON.stringify({
        guesses,
        status: gameState,
        streak,
        lastStreak,
        targetName: targetPlayer.name
      }));
    }
  }, [guesses, gameState, streak, gameMode, targetPlayer, lastStreak]);

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
      if (gameMode === 'endless') {
        setStreak(s => s + 1);
      }
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
      if (gameMode === 'endless') {
        setLastStreak(streak);
        setStreak(0);
      }
    }
  };

  const nextEndless = () => {
    setGuesses([]);
    setGameState('playing');
    setTargetPlayer(players[Math.floor(Math.random() * players.length)]);
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

    let text = "";
    if (gameMode === 'daily') {
      text = `*COPAQUIZ DLE DIÁRIO* ⚽📅\n\nConsegui descobrir o craque do dia em *${guesses.length}/6* tentativas!\n\n${emojis}\n\n*Duvido você acertar!* 👀`;
    } else {
      const currentResult = gameState === 'won' ? streak : lastStreak;
      text = `*COPAQUIZ DLE INFINITO* ⚽🔥\n\nFiz uma sequência de *${currentResult} vitórias seguidas*!\n\n${emojis}\n\n*Consegue bater meu recorde?* 🏆`;
    }

    const url = "https://www.copaquiz.com.br/quem-e";
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

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !guesses.some(g => g.player.name === p.name)
  );

  return (
    <div className="dle-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setGameMode('daily')}
          style={{
            padding: '10px 20px',
            borderRadius: '100px',
            border: 'none',
            background: gameMode === 'daily' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
            transition: '0.3s'
          }}
        >
          📅 Desafio Diário
        </button>
        <button 
          onClick={() => setGameMode('endless')}
          style={{
            padding: '10px 20px',
            borderRadius: '100px',
            border: 'none',
            background: gameMode === 'endless' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
            transition: '0.3s'
          }}
        >
          🔥 Modo Infinito
        </button>
      </div>

      {/* Game Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          {gameMode === 'daily' ? 'Desafio do Dia' : 'Modo Infinito'}
        </h1>
        {gameMode === 'endless' && (
          <div style={{ fontSize: '1.2rem', color: 'var(--secondary)', fontWeight: 700 }}>
            🎯 Sequência: {streak} vitórias
          </div>
        )}
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
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>O jogador era: <strong style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>{targetPlayer?.name}</strong></p>
          
          {gameMode === 'endless' && gameState === 'lost' && (
            <p style={{ marginBottom: '1rem', fontWeight: 700 }}>Sequência final: {lastStreak} vitórias</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <button onClick={shareResult} className="btn btn-primary" style={{ width: '100%' }}>
              Compartilhar Resultado 🚀
            </button>
            
            {gameMode === 'endless' ? (
              <button 
                onClick={nextEndless} 
                className="btn" 
                style={{ 
                  width: '100%',
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white'
                }}
              >
                {gameState === 'won' ? 'Próximo Jogador ⏩' : 'Tentar Novamente 🔄'}
              </button>
            ) : (
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }}>O desafio diário acabou! Quer continuar jogando?</p>
                <button 
                  onClick={() => setGameMode('endless')}
                  className="btn"
                  style={{ width: '100%', background: 'var(--secondary)', color: 'black' }}
                >
                  Ir para o Modo Infinito 🔥
                </button>
              </div>
            )}
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
