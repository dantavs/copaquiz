'use client';
import { useCollectorStore } from '@/lib/collectorStore';
import { stickers } from '@/data/collector2026';

export default function StickerGrid() {
  const owned = useCollectorStore((s) => s.owned);
  const increment = useCollectorStore((s) => s.increment);
  const decrement = useCollectorStore((s) => s.decrement);

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'var(--primary)',
    color: '#000',
    fontWeight: 800,
    fontSize: '0.75rem',
    minWidth: '22px',
    height: '22px',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  };

  const btnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
  };

  const rarityCard: Record<string, React.CSSProperties> = {
    NORMAL: {
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
    },
    HOLOGRAPHIC: {
      background: 'linear-gradient(135deg, rgba(0,112,255,0.18), rgba(200,0,255,0.12), rgba(0,255,200,0.10))',
      border: '2px solid transparent',
      outline: '1px solid rgba(150,100,255,0.5)',
      boxShadow: '0 0 15px rgba(150,100,255,0.25), inset 0 0 15px rgba(150,100,255,0.08)',
    },
    GOLDEN: {
      background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(200,150,0,0.15))',
      border: '2px solid var(--accent)',
      boxShadow: '0 0 20px rgba(255,215,0,0.3), inset 0 0 10px rgba(255,215,0,0.08)',
    },
    SPECIAL: {
      background: 'linear-gradient(135deg, rgba(255,60,60,0.18), rgba(200,40,200,0.12))',
      border: '2px solid #ff4466',
      boxShadow: '0 0 20px rgba(255,60,60,0.25), inset 0 0 10px rgba(255,60,60,0.08)',
    },
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
      gap: '1rem',
    }}>
      {stickers.map(sticker => {
        const quantity = owned[sticker.id] ?? 0;
        return (
          <div
            key={sticker.id}
            style={{
              position: 'relative',
              padding: '1rem 0.5rem',
              borderRadius: 'var(--border-radius)',
              textAlign: 'center',
              ...rarityCard[sticker.rarity],
            }}
          >
            {quantity > 0 && (
              <div style={badgeStyle}>
                {quantity}
              </div>
            )}
            <div style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              {sticker.id}
            </div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              {sticker.name}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
              <button
                style={btnStyle}
                onClick={() => decrement(sticker.id)}
                aria-label={`Remover ${sticker.id}`}
              >
                &minus;
              </button>
              <button
                style={{ ...btnStyle, background: 'var(--primary)', color: '#000', border: 'none' }}
                onClick={() => increment(sticker.id)}
                aria-label={`Adicionar ${sticker.id}`}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
