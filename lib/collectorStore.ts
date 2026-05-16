import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AlbumData {
  code: string;
  name: string;
  owner: string;
  stickers: Record<string, number>;
  createdAt: string;
}

interface StoreState {
  albums: Record<string, AlbumData>;
  currentAlbumCode: string | null;
}

interface StoreActions {
  setCurrentAlbum: (code: string) => void;
  loadAlbums: () => Promise<void>;
  addAlbum: (name: string, owner: string) => Promise<string>;
  joinAlbum: (code: string) => Promise<void>;
  renameAlbum: (code: string, name: string) => Promise<void>;
  deleteAlbum: (code: string) => Promise<void>;
  increment: (stickerId: string) => void;
  decrement: (stickerId: string) => void;
  syncAlbum: () => Promise<void>;
}

export type AlbumStore = StoreState & StoreActions;

export const useCollectorStore = create<AlbumStore>()(
  persist(
    (set, get) => ({
      albums: {},
      currentAlbumCode: null,

      setCurrentAlbum: (code) => set({ currentAlbumCode: code }),

      loadAlbums: async () => {
        try {
          const res = await fetch('/api/albums');
          if (!res.ok) return;
          const data = await res.json();
          const map: Record<string, AlbumData> = {};
          for (const album of data) {
            map[album.code] = { ...album };
          }
          set({ albums: map });
          // If currentAlbumCode is set but album not loaded yet, load it
          const currentCode = get().currentAlbumCode;
          if (currentCode && !map[currentCode]) {
            set({ currentAlbumCode: null });
          }
        } catch {
          // Keep data from localStorage if API fails
        }
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
        try {
          await fetch(`/api/albums/${code}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stickers: album.stickers }),
          });
        } catch {
          // Silently fail - data is safe in localStorage
        }
      },
    }),
    {
      name: 'collector-storage',
      version: 2,
    }
  )
);
