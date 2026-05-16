'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCollectorStore } from '@/lib/collectorStore';
import type { AlbumData } from '@/lib/collectorStore';

function JoinContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const codeFromUrl = searchParams.get('code');

  const [code, setCode] = useState(codeFromUrl ?? '');
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState(false);

  const joinAlbum = useCollectorStore((s) => s.joinAlbum);

  useEffect(() => {
    if (codeFromUrl) {
      setCode(codeFromUrl);
      handleSearch(codeFromUrl);
    }
  }, [codeFromUrl]);

  const handleSearch = async (searchCode?: string) => {
    const targetCode = searchCode ?? code;
    if (!targetCode.trim()) return;
    setSearching(true);
    setError('');
    setAlbum(null);
    try {
      const res = await fetch(`/api/albums/${targetCode.trim()}`);
      if (!res.ok) {
        setError('Álbum não encontrado. Verifique o código e tente novamente.');
        return;
      }
      const data = await res.json();
      setAlbum(data);
    } catch {
      setError('Erro ao buscar álbum. Verifique sua conexão.');
    } finally {
      setSearching(false);
    }
  };

  const handleJoin = async () => {
    if (!album) return;
    setAdding(true);
    try {
      await joinAlbum(album.code);
      router.push('/collector');
    } catch {
      setError('Erro ao adicionar álbum. Tente novamente.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="container" style={{ minHeight: '70vh', padding: '2rem 1rem' }}>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        Entrar em Álbum
      </h1>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '2rem' }}>
        Cole o código do álbum compartilhado com você.
      </p>

      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--border-radius)',
        padding: '2rem',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <input
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(0,0,0,0.3)',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
            placeholder="Código do álbum"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}
            onClick={() => handleSearch()}
            disabled={searching || !code.trim()}
          >
            {searching ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            background: 'rgba(255,50,50,0.15)',
            border: '1px solid rgba(255,50,50,0.3)',
            color: '#ff6666',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {album && (
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ marginBottom: '0.75rem' }}>{album.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              <div>
                <strong>Dono:</strong> {album.owner}
              </div>
              <div>
                <strong>Código:</strong> <span style={{ fontFamily: 'monospace' }}>{album.code}</span>
              </div>
              <div>
                <strong>Criado em:</strong>{' '}
                {new Date(album.createdAt).toLocaleDateString('pt-BR')}
              </div>
              <div>
                <strong>Figurinhas:</strong>{' '}
                {Object.keys(album.stickers).length} colecionadas
              </div>
            </div>
          </div>
        )}

        {album && (
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handleJoin}
            disabled={adding}
          >
            {adding ? 'Adicionando...' : 'Adicionar à Minha Coleção'}
          </button>
        )}
      </div>
    </main>
  );
}

export default function JoinPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ opacity: 0.6 }}>Carregando...</p>
        </main>
      }>
        <JoinContent />
      </Suspense>
      <Footer />
    </>
  );
}
