import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AlbumData {
  code: string;
  name: string;
  owner: string;
  stickers: Record<string, number>;
  createdAt: string;
}

export interface AlbumStore {
  albums: Record<string, AlbumData>;
  currentAlbumCode: string | null;
  readonly currentAlbumName: string;
  setCurrentAlbum: (code: string) => void;
  loadAlbums: () => Promise<void>;
  loadAlbum: (code: string) => Promise<void>;
  addAlbum: (name: string, owner: string) => Promise<string>;
  joinAlbum: (code: string) => Promise<void>;
  renameAlbum: (code: string, name: string) => Promise<void>;
  deleteAlbum: (code: string) => Promise<void>;
  increment: (stickerId: string) => void;
  decrement: (stickerId: string) => void;
  syncAlbum: () => Promise<void>;
}

export const useCollectorStore = create<AlbumStore>()(
  persist(
    (set, get) => ({
      albums: {},
      currentAlbumCode: null,

      get currentAlbumName() {
        const code = get().currentAlbumCode;
        return code && get().albums[code] ? get().albums[code].name : 'Meu Álbum';
      },

      setCurrentAlbum: (code) => set({ currentAlbumCode: code }),

      loadAlbums: async () => {
        try {
          const res = await fetch('/api/albums');
          if (!res.ok) return;
          const data = await res.json();
          const map: Record<string, AlbumData> = {};
          for (const album of data) {
            map[album.code] = album;
          }
          set({ albums: map });
        } catch {
          // Silently fail - albums will remain as-is (from localStorage)
        }
      },

      loadAlbum: async (code) => {
        const res = await fetch(`/api/albums/${code}`);
        const album = await res.json();
        set((state) => ({
          albums: { ...state.albums, [code]: album },
        }));
      },

      addAlbum: async (name, owner) => {
        const res = await fetch('/api/albums', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, owner }),
        });
        const album = await res.json();
        set((state) => ({
          albums: { ...state.albums, [album.code]: album },
          currentAlbumCode: album.code,
        }));
        return album.code;
      },

      joinAlbum: async (code) => {
        const res = await fetch(`/api/albums/${code}`);
        const album = await res.json();
        if (!album.code) throw new Error('Álbum não encontrado');
        set((state) => ({
          albums: { ...state.albums, [code]: album },
          currentAlbumCode: code,
        }));
      },

      renameAlbum: async (code, name) => {
        await fetch(`/api/albums/${code}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
        set((state) => {
          const album = state.albums[code];
          if (!album) return state;
          return {
            albums: { ...state.albums, [code]: { ...album, name } },
          };
        });
      },

      deleteAlbum: async (code) => {
        await fetch(`/api/albums/${code}`, { method: 'DELETE' });
        set((state) => {
          const { [code]: _, ...rest } = state.albums;
          const keys = Object.keys(rest);
          return {
            albums: rest,
            currentAlbumCode: state.currentAlbumCode === code
              ? (keys[0] ?? null)
              : state.currentAlbumCode,
          };
        });
      },

      increment: (stickerId) => {
        const code = get().currentAlbumCode;
        if (!code || !get().albums[code]) return;
        const album = get().albums[code];
        const current = album.stickers[stickerId] ?? 0;
        set({
          albums: {
            ...get().albums,
            [code]: { ...album, stickers: { ...album.stickers, [stickerId]: current + 1 } },
          },
        });
        get().syncAlbum();
      },

      decrement: (stickerId) => {
        const code = get().currentAlbumCode;
        if (!code || !get().albums[code]) return;
        const album = get().albums[code];
        const current = album.stickers[stickerId] ?? 0;
        if (current <= 0) return;
        set({
          albums: {
            ...get().albums,
            [code]: { ...album, stickers: { ...album.stickers, [stickerId]: current - 1 } },
          },
        });
        get().syncAlbum();
      },

      syncAlbum: async () => {
        const code = get().currentAlbumCode;
        if (!code || !get().albums[code]) return;
        const album = get().albums[code];
        await fetch(`/api/albums/${code}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stickers: album.stickers }),
        });
      },
    }),
    {
      name: 'collector-storage',
      version: 1,
      partialize: (state) => {
        const { currentAlbumName: _, ...rest } = state as unknown as AlbumStore & { currentAlbumName: string };
        return rest;
      },
    }
  )
);
