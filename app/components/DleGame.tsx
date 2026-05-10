'use client';

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Player, players } from '../data/players';
import { calculateStreakProgress, getTrophyStates } from '../lib/streak-utils';

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

function DleGameContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'infinite' ? 'endless' : 'daily';
  const [gameMode, setGameMode] = useState<GameMode>(initialMode);
  const [targetPlayer, setTargetPlayer] = useState<Player | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [guesses, setGuesses] = useState<GuessFeedback[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [streak, setStreak] = useState(0);
  const [lastStreak, setLastStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(-1);
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
        setBestStreak(parsed.bestStreak || parsed.streak || 0);
        
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
        setBestStreak(0);
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
        bestStreak,
        targetName: targetPlayer.name
      }));
    }
  }, [guesses, gameState, streak, gameMode, targetPlayer, lastStreak, bestStreak]);

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
    setFocusedIndex(-1);

    if (player.name === targetPlayer?.name) {
      setGameState('won');
      if (gameMode === 'endless') {
        setStreak(prev => {
          const updated = prev + 1;
          setBestStreak(best => Math.max(best, updated));
          return updated;
        });
      }
      
      // Feedback de vitória
      if (typeof window !== 'undefined') {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        launchConfetti();
      }
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
      if (gameMode === 'endless') {
        setLastStreak(streak);
        setStreak(0);
      }
    }
  };

  // Confete mais leve visualmente
  const launchConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      document.body.removeChild(canvas);
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#ffffff'];
    const particles = Array.from({ length: 90 }).map(() => ({
      x: canvas.width / 2 + (Math.random() * canvas.width) / 6 - canvas.width / 12,
      y: canvas.height * 0.15,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      velocity: Math.random() * 12 + 4,
      friction: 0.95,
      gravity: 0.25,
      opacity: 1
    }));

    const duration = 2200;
    const start = performance.now();

    const cleanup = () => {
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.velocity *= p.friction;
        p.x += Math.cos(p.angle) * p.velocity;
        p.y += Math.sin(p.angle) * p.velocity + p.gravity;
        p.opacity -= 0.01;

        if (p.opacity > 0.05) {
          alive = true;
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      ctx.globalAlpha = 1;

      if ((alive || time - start < duration) && canvas.parentNode) {
        requestAnimationFrame(animate);
      } else {
        cleanup();
      }
    };

    requestAnimationFrame(animate);
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
        g.checks.league === 'correct' ? '🟩' : '⬜',
        g.checks.position === 'correct' ? '🟩' : (g.checks.position === 'near' ? '🟨' : '⬜'),
        g.checks.age.status === 'correct' ? '🟩' : (g.checks.age.status === 'near' ? '🟨' : '⬜'),
        g.checks.height.status === 'correct' ? '🟩' : (g.checks.height.status === 'near' ? '🟨' : '⬜'),
      ].join('');
      return row;
    }).join('\n');

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

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredPlayers = players.filter(p => 
    normalizeString(p.name).includes(normalizeString(searchTerm)) && 
    !guesses.some(g => g.player.name === p.name)
  );

  const trophyStates = useMemo(() => (
    gameMode === 'endless' ? getTrophyStates(bestStreak) : []
  ), [gameMode, bestStreak]);

  const streakProgress = useMemo(() => (
    gameMode === 'endless' ? calculateStreakProgress(streak) : null
  ), [gameMode, streak]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredPlayers.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < filteredPlayers.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < filteredPlayers.length) {
        handleSelectPlayer(filteredPlayers[focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setFocusedIndex(-1);
    }
  };

  // Scroll into view logic for the dropdown
  useEffect(() => {
    if (showDropdown && focusedIndex >= 0 && dropdownRef.current) {
      const container = dropdownRef.current;
      const activeElement = container.children[focusedIndex] as HTMLElement;
      if (activeElement) {
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        const elementTop = activeElement.offsetTop;
        const elementBottom = elementTop + activeElement.clientHeight;

        if (elementTop < containerTop) {
          container.scrollTop = elementTop;
        } else if (elementBottom > containerBottom) {
          container.scrollTop = elementBottom - container.clientHeight;
        }
      }
    }
  }, [focusedIndex, showDropdown]);

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
          <div className="streak-hud glass">
            <div className="streak-hud__stats">
              <div className="streak-chip" aria-live="polite">
                🔥 Sequência atual <strong>{streak}</strong>
              </div>
              <div className="streak-chip streak-chip--ghost">
                🏆 Recorde <strong>{Math.max(bestStreak, streak)}</strong>
              </div>
            </div>

            {streakProgress && (
              <div className="streak-progress">
                <div className="streak-progress__labels">
                  <span>Rumo ao {streakProgress.nextLabel}</span>
                  <span>
                    {streakProgress.remainingWins > 0
                      ? `${streakProgress.remainingWins} vitória(s) para avançar`
                      : 'Você virou lenda!'}
                  </span>
                </div>
                <div className="streak-progress__bar" role="progressbar" aria-valuenow={streakProgress.percentage} aria-valuemin={0} aria-valuemax={100}>
                  <div className="streak-progress__fill" style={{ width: `${streakProgress.percentage}%` }} />
                </div>
              </div>
            )}

            <div className="trophy-row" aria-label="Troféus desbloqueados">
              {trophyStates.map(tier => (
                <div
                  key={tier.id}
                  className={`trophy-card ${tier.unlocked ? 'trophy-card--unlocked' : ''}`}
                >
                  <span className="trophy-card__icon" role="img" aria-label={tier.label}>{tier.emoji}</span>
                  <div className="trophy-card__texts">
                    <span className="trophy-card__label">{tier.label}</span>
                    <span className="trophy-card__threshold">{tier.threshold} vitórias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        {targetPlayer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              padding: '4px 10px', 
              borderRadius: '6px',
              background: targetPlayer.difficulty === 'facil' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: targetPlayer.difficulty === 'facil' ? '#10b981' : '#f59e0b',
              border: `1px solid ${targetPlayer.difficulty === 'facil' ? '#10b981' : '#f59e0b'}`,
              textTransform: 'uppercase'
            }}>
              Nível: {targetPlayer.difficulty}
            </span>
          </div>
        )}
        <input
          type="text"
          className="glass"
          placeholder={gameState === 'playing' ? "Digite o nome de um jogador..." : "Fim de jogo!"}
          disabled={gameState !== 'playing'}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
            setFocusedIndex(-1); // Reset focus on new search
          }}
          onKeyDown={handleKeyDown}
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
            {filteredPlayers.map((p, index) => (
              <div 
                key={p.name}
                onClick={() => handleSelectPlayer(p)}
                onMouseEnter={() => setFocusedIndex(index)}
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'background 0.2s',
                  background: index === focusedIndex ? 'rgba(16, 185, 129, 0.2)' : 'transparent'
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

      {/* Attempts Counter */}
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 700, fontSize: '1.2rem', color: 'var(--secondary)' }}>
        Tentativa: {guesses.length} / 6
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

      {/* Guesses Cards */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {guesses.map((g, i) => {
          const isCorrect = g.player.name === targetPlayer?.name;
          return (
            <div key={i} className="glass animate-pop" style={{ 
              padding: '1rem', 
              borderRadius: '12px',
              border: isCorrect ? '3px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: isCorrect ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
              position: 'relative'
            }}>
              {isCorrect && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '10px',
                  background: 'var(--primary)',
                  color: 'black',
                  padding: '2px 10px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 900
                }}>
                  VENCEDOR
                </div>
              )}
              <div style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.8rem', color: isCorrect ? 'var(--primary)' : 'white' }}>
                {g.player.name}
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '6px' 
              }}>
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
            </div>
          );
        })}
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
      padding: '0.5rem 0.2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50px',
      border: '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.5s ease'
    }}>
      <span style={{ fontSize: '0.65rem', fontWeight: 700, lineHeight: 1.2 }}>{label}</span>
      {direction && (
        <span style={{ fontSize: '1.1rem', marginTop: '1px', fontWeight: 900 }}>
          {direction === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
  );
}

const DleGame = () => {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>Carregando jogo...</div>}>
      <DleGameContent />
    </Suspense>
  );
};

export default DleGame;
