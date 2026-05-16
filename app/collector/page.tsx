'use client';
import { useState, useMemo, useEffect } from 'react';
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

const modalOverlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
  padding: '1rem',
};

const modalCard: React.CSSProperties = {
  background: 'var(--card-bg)',
  border: '1px solid var(--glass-border)',
  borderRadius: 'var(--border-radius)',
  padding: '2rem',
  maxWidth: '440px',
  width: '100%',
  boxShadow: 'var(--shadow)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '12px',
  border: '1px solid var(--glass-border)',
  background: 'rgba(0,0,0,0.3)',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  transition: 'var(--transition)',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
};

const toastStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'var(--primary)',
  color: '#000',
  fontWeight: 700,
  padding: '0.75rem 1.5rem',
  borderRadius: '12px',
  zIndex: 1000,
  boxShadow: '0 4px 20px rgba(0,223,94,0.4)',
  animation: 'bounceIn 0.4s ease',
};

export default function CollectorPage() {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [welcomeName, setWelcomeName] = useState('');
  const [welcomeOwner, setWelcomeOwner] = useState('');
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumOwner, setNewAlbumOwner] = useState('');
  const [renameValue, setRenameValue] = useState('');

  const albums = useCollectorStore((s) => s.albums);
  const currentAlbumCode = useCollectorStore((s) => s.currentAlbumCode);
  const currentAlbumName = useCollectorStore((s) => s.currentAlbumName);
  const setCurrentAlbum = useCollectorStore((s) => s.setCurrentAlbum);
  const loadAlbums = useCollectorStore((s) => s.loadAlbums);
  const addAlbum = useCollectorStore((s) => s.addAlbum);
  const renameAlbum = useCollectorStore((s) => s.renameAlbum);
  const deleteAlbum = useCollectorStore((s) => s.deleteAlbum);

  const owned = currentAlbumCode && albums[currentAlbumCode]
    ? albums[currentAlbumCode].stickers : {};

  const albumList = useMemo(() => Object.values(albums), [albums]);

  useEffect(() => {
    loadAlbums().finally(() => setLoading(false));
  }, [loadAlbums]);

  useEffect(() => {
    if (!loading && albumList.length === 0) {
      setShowWelcome(true);
    }
  }, [loading, albumList.length]);

  const counts = useMemo(() => {
    const total = stickers.length;
    const repeated = stickers.filter((s) => (owned[s.id] ?? 0) > 1).length;
    const missing = stickers.filter((s) => (owned[s.id] ?? 0) === 0).length;
    return { all: total, repeated, missing };
  }, [owned]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateWelcome = async () => {
    if (!welcomeName.trim() || !welcomeOwner.trim()) return;
    await addAlbum(welcomeName.trim(), welcomeOwner.trim());
    setShowWelcome(false);
  };

  const handleCreateNewAlbum = async () => {
    if (!newAlbumName.trim() || !newAlbumOwner.trim()) return;
    await addAlbum(newAlbumName.trim(), newAlbumOwner.trim());
    setShowNewAlbum(false);
    setNewAlbumName('');
    setNewAlbumOwner('');
  };

  const handleShare = () => {
    if (!currentAlbumCode) return;
    const link = `${window.location.origin}/collector/join?code=${currentAlbumCode}`;
    navigator.clipboard.writeText(link).then(() => {
      showToast('Link copiado! Envie para seus amigos.');
    }).catch(() => {
      showToast('Erro ao copiar link.');
    });
  };

  const handleRename = async () => {
    if (!currentAlbumCode || !renameValue.trim()) return;
    await renameAlbum(currentAlbumCode, renameValue.trim());
    setShowSettings(false);
  };

  const handleDelete = async () => {
    if (!currentAlbumCode) return;
    if (!window.confirm('Tem certeza que deseja deletar este álbum?')) return;
    await deleteAlbum(currentAlbumCode);
    setShowSettings(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ opacity: 0.6, fontSize: '1.2rem' }}>Carregando...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container" style={{ minHeight: '70vh', padding: '2rem 1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          CopaCollector 2026
        </h1>

        {albumList.length > 0 && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}>
              <select
                value={currentAlbumCode ?? ''}
                onChange={(e) => setCurrentAlbum(e.target.value)}
                style={{
                  ...selectStyle,
                  maxWidth: '260px',
                }}
              >
                {albumList.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.name} ({a.owner})
                  </option>
                ))}
              </select>

              <button
                style={{ ...tabStyle(false), padding: '0.5rem 1rem' }}
                onClick={() => {
                  setNewAlbumName('');
                  setNewAlbumOwner('');
                  setShowNewAlbum(true);
                }}
              >
                + Novo
              </button>

              <button
                style={{ ...tabStyle(false), padding: '0.5rem 1rem', fontSize: '1.1rem' }}
                onClick={handleShare}
                title="Compartilhar álbum"
              >
                Compartilhar
              </button>

              <button
                style={{ ...tabStyle(false), padding: '0.5rem 0.9rem', fontSize: '1.1rem' }}
                onClick={() => {
                  setRenameValue(albums[currentAlbumCode ?? '']?.name ?? '');
                  setShowSettings(true);
                }}
                title="Gerenciar álbum"
              >
                &#9881;
              </button>
            </div>

            <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '1.5rem' }}>
              {currentAlbumName} &mdash; Gerencie sua coleção de figurinhas da Copa do Mundo!
            </p>
          </>
        )}

        {albumList.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
            {filters.map((f) => (
              <button key={f.key} style={tabStyle(filter === f.key)} onClick={() => setFilter(f.key)}>
                {f.label}
                <span style={badgeStyle}>{counts[f.key]}</span>
              </button>
            ))}
          </div>
        )}

        {albumList.length > 0 && <StickerGrid filter={filter} />}
      </main>
      <Footer />

      {/* Welcome Modal */}
      {showWelcome && (
        <div style={modalOverlay}>
          <div style={modalCard}>
            <h2 style={{ marginBottom: '0.5rem' }}>Bem-vindo ao CopaCollector!</h2>
            <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Crie seu primeiro álbum de figurinhas para começar a colecionar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', opacity: 0.8 }}>
                  Nome do Álbum
                </label>
                <input
                  style={inputStyle}
                  placeholder="Ex: Coleção da Família"
                  value={welcomeName}
                  onChange={(e) => setWelcomeName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', opacity: 0.8 }}>
                  Seu Apelido
                </label>
                <input
                  style={inputStyle}
                  placeholder="Ex: Daniel"
                  value={welcomeOwner}
                  onChange={(e) => setWelcomeOwner(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={handleCreateWelcome}
                disabled={!welcomeName.trim() || !welcomeOwner.trim()}
              >
                Criar Álbum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Album Modal */}
      {showNewAlbum && (
        <div style={modalOverlay} onClick={() => setShowNewAlbum(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1.5rem' }}>Novo Álbum</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', opacity: 0.8 }}>
                  Nome do Álbum
                </label>
                <input
                  style={inputStyle}
                  placeholder="Ex: Coleção da Família"
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', opacity: 0.8 }}>
                  Seu Apelido
                </label>
                <input
                  style={inputStyle}
                  placeholder="Ex: Daniel"
                  value={newAlbumOwner}
                  onChange={(e) => setNewAlbumOwner(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={handleCreateNewAlbum}
                disabled={!newAlbumName.trim() || !newAlbumOwner.trim()}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div style={modalOverlay} onClick={() => setShowSettings(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1.5rem' }}>Gerenciar Álbum</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', opacity: 0.8 }}>
                  Renomear
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}
                    onClick={handleRename}
                    disabled={!renameValue.trim()}
                  >
                    Salvar
                  </button>
                </div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '0.5rem 0' }} />
              <button
                style={{
                  ...tabStyle(false),
                  background: 'rgba(255,50,50,0.15)',
                  border: '1px solid rgba(255,50,50,0.3)',
                  color: '#ff4444',
                  padding: '0.75rem',
                  width: '100%',
                  justifyContent: 'center',
                }}
                onClick={handleDelete}
              >
                Deletar Álbum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={toastStyle}>
          {toast}
        </div>
      )}
    </>
  );
}
