'use client';

import { useMemo } from 'react';
import { stickers, type Sticker } from '@/data/collector2026';
import { useCollectorStore } from '@/lib/collectorStore';

type Category = Sticker['category'];

const containerStyle: React.CSSProperties = {
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  borderRadius: 'var(--border-radius)',
  backdropFilter: 'blur(12px)',
  padding: '1.5rem',
  marginBottom: '1.5rem',
  boxShadow: 'var(--shadow)',
};

const statRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.9rem',
  marginBottom: '0.4rem',
};

const label: React.CSSProperties = {
  opacity: 0.7,
};

const value: React.CSSProperties = {
  fontWeight: 700,
};

const barBg: React.CSSProperties = {
  width: '100%',
  height: '10px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '999px',
  overflow: 'hidden',
  margin: '0.5rem 0 1rem',
};

const barFill = (pct: number): React.CSSProperties => ({
  width: `${pct}%`,
  height: '100%',
  background: 'linear-gradient(90deg, var(--primary), #00ff85)',
  borderRadius: '999px',
  transition: 'width 0.6s ease',
});

const catGrid: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  marginTop: '0.75rem',
  flexWrap: 'wrap',
};

const catBadge = (cat: Category): React.CSSProperties => ({
  flex: 1,
  minWidth: '120px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  padding: '0.6rem 0.8rem',
  textAlign: 'center',
  border: `1px solid ${
    cat === 'CLASSIC' ? 'rgba(0,223,94,0.3)' :
    cat === 'COCA_COLA' ? 'rgba(255,50,50,0.3)' :
    'rgba(255,200,0,0.3)'
  }`,
});

const catLabel: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  opacity: 0.6,
  marginBottom: '0.2rem',
};

const catPct: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: 800,
};

const btnStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.6rem 1rem',
  borderRadius: '12px',
  border: '1px solid var(--glass-border)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'var(--transition)',
  textAlign: 'center' as const,
};

export default function ProgressDashboard({
  onExportMissing,
  onExportRepeated,
}: {
  onExportMissing?: () => void;
  onExportRepeated?: () => void;
}) {
  const owned = useCollectorStore((s) => {
    const code = s.currentAlbumCode;
    return code && s.albums[code] ? s.albums[code].stickers : {};
  });

  const stats = useMemo(() => {
    const total = stickers.length;
    let collected = 0;
    let repeated = 0;
    let missing = 0;

    const catTotals: Record<Category, number> = { CLASSIC: 0, COCA_COLA: 0, SPECIAL: 0 };
    const catOwned: Record<Category, number> = { CLASSIC: 0, COCA_COLA: 0, SPECIAL: 0 };

    for (const s of stickers) {
      catTotals[s.category]++;
      const qty = owned[s.id] ?? 0;
      if (qty > 0) {
        collected++;
        catOwned[s.category]++;
      }
      if (qty > 1) repeated += (qty - 1);
      if (qty === 0) missing++;
    }

    const pctOverall = total > 0 ? Math.round((collected / total) * 100) : 0;

    const catPcts: Record<Category, number> = { CLASSIC: 0, COCA_COLA: 0, SPECIAL: 0 };
    for (const cat of Object.keys(catTotals) as Category[]) {
      catPcts[cat] = catTotals[cat] > 0 ? Math.round((catOwned[cat] / catTotals[cat]) * 100) : 0;
    }

    return { total, collected, repeated, missing, pctOverall, catPcts };
  }, [owned]);

  return (
    <div style={containerStyle}>
      <div style={statRow}>
        <span style={label}>{stats.collected} de {stats.total} figurinhas colecionadas</span>
        <span style={value}>{stats.pctOverall}%</span>
      </div>
      <div style={barBg}>
        <div style={barFill(stats.pctOverall)} />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={statRow}>
          <span style={label}>{stats.repeated} repetidas disponíveis para troca</span>
        </div>
        <div style={statRow}>
          <span style={label}>{stats.missing} faltando</span>
        </div>
      </div>

      <div style={catGrid}>
        {(Object.keys(stats.catPcts) as Category[]).map((cat) => {
          const nameMap: Record<Category, string> = {
            CLASSIC: 'Seleções',
            COCA_COLA: 'Coca-Cola',
            SPECIAL: 'Especial',
          };
          return (
            <div key={cat} style={catBadge(cat)}>
              <div style={catLabel}>{nameMap[cat]}</div>
              <div style={catPct}>{stats.catPcts[cat]}%</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <button style={btnStyle} onClick={onExportMissing}>
          📋 Exportar Faltantes
        </button>
        <button style={btnStyle} onClick={onExportRepeated}>
          🔄 Exportar Repetidas
        </button>
      </div>
    </div>
  );
}
