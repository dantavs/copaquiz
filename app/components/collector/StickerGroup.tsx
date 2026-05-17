'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Sticker } from '@/data/collector2026';

interface Props {
  groupName: string;
  flagSvg?: string;
  flagEmoji?: string;
  stickers: Sticker[];
  owned: Record<string, number>;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  initialExpanded?: boolean;
  totalInGroup: number;
  collectedInGroup: number;
  showProgress: boolean;
  showRepeatedCount?: boolean;
}

const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '4px',
  right: '4px',
  background: 'var(--primary)',
  color: '#000',
  fontWeight: 800,
  fontSize: '0.7rem',
  minWidth: '20px',
  height: '20px',
  borderRadius: '999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  zIndex: 2,
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

export default function StickerGroup({ groupName, flagSvg, flagEmoji, stickers, owned, onIncrement, onDecrement, initialExpanded = true, totalInGroup, collectedInGroup, showProgress, showRepeatedCount }: Props) {
  const [expanded, setExpanded] = useState(initialExpanded);

  const collected = collectedInGroup;
  const total = totalInGroup;
  const repeatedCount = stickers.reduce((sum, s) => {
    const qty = owned[s.id] ?? 0;
    return sum + Math.max(0, qty - 1);
  }, 0);
  const displayCount = showRepeatedCount ? repeatedCount : collected;

  return (
    <div style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden',
      transition: 'var(--transition)',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem 1.25rem',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'var(--transition)',
        }}
        aria-expanded={expanded}
      >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
              {flagSvg ? (
                <Image
                  src={`https://flagcdn.com/16x12/${flagSvg}.png`}
                  width={16}
                  height={12}
                  alt={groupName}
                  style={{ borderRadius: '2px', display: 'block' }}
                  unoptimized
                />
              ) : flagEmoji ? (
                <span style={{ fontSize: '1.1rem' }}>{flagEmoji}</span>
              ) : null}
              {groupName}
            </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            opacity: 0.85,
          }}>
            <span>{showRepeatedCount ? `${displayCount} repetidas` : `${collected}/${total}`}</span>
            <span style={{
              transition: 'transform 0.3s ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              fontSize: '0.75rem',
            }}>
              &#9660;
            </span>
          </span>
        </div>
        {/* Progress bar */}
        {showProgress && (
          <div style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '6px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${total > 0 ? (collected / total) * 100 : 0}%`,
              borderRadius: '999px',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              transition: 'width 0.4s ease',
            }} />
          </div>
        )}
      </button>

      <div style={{
        maxHeight: expanded ? `${stickers.length * 220}px` : '0',
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s ease, opacity 0.3s ease',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '1rem',
          padding: '0 1.25rem 1.25rem',
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
                    onClick={() => onDecrement(sticker.id)}
                    aria-label={`Remover ${sticker.id}`}
                  >
                    &minus;
                  </button>
                  <button
                    style={{ ...btnStyle, background: 'var(--primary)', color: '#000', border: 'none' }}
                    onClick={() => onIncrement(sticker.id)}
                    aria-label={`Adicionar ${sticker.id}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
