'use client';
import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickerGrid from '../components/collector/StickerGrid';
import { useCollectorStore } from '@/lib/collectorStore';
import { stickers } from '@/data/collector2026';
import type { FilterMode } from '../components/collector/StickerGrid';

const filters: { key: FilterMode; label: string }[] = [
  { key: 'missing', label: 'Faltantes' },
  { key: 'repeated', label: 'Repetidas' },
  { key: 'all', label: 'Todas' },
];

const tabStyle = (active: boolean): React.CSSProperties => ({
  background: active ? 'var(--primary)' : 'var(--glass-bg)',
  color: active ? '#000' : '#fff',
  border: active ? 'none' : '1px solid var(--glass-border)',
  padding: '0.5rem 1.25rem',
  borderRadius: '999px',
  fontWeight: 700,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'var(--transition)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

const badgeStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: '0.7rem',
  fontWeight: 800,
  padding: '0.1rem 0.5rem',
  borderRadius: '999px',
  minWidth: '20px',
  textAlign: 'center',
};

export default function CollectorPage() {
  const [filter, setFilter] = useState<FilterMode>('all');
  const owned = useCollectorStore((s) => s.owned);

  const counts = useMemo(() => {
    const total = stickers.length;
    const repeated = stickers.filter((s) => (owned[s.id] ?? 0) > 1).length;
    const missing = stickers.filter((s) => (owned[s.id] ?? 0) === 0).length;
    return { all: total, repeated, missing };
  }, [owned]);

  return (
    <>
      <Header />
      <main className="container" style={{ minHeight: '70vh', padding: '2rem 1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          🏅 CopaCollector 2026
        </h1>
        <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '2rem' }}>
          Gerencie sua coleção de figurinhas da Copa do Mundo!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
          {filters.map((f) => (
            <button key={f.key} style={tabStyle(filter === f.key)} onClick={() => setFilter(f.key)}>
              {f.label}
              <span style={badgeStyle}>{counts[f.key]}</span>
            </button>
          ))}
        </div>
        <StickerGrid filter={filter} />
      </main>
      <Footer />
    </>
  );
}
