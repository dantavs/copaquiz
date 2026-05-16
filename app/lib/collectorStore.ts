import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Sticker } from '../data/collector2026';

export interface CollectorState {
  owned: Record<string, number>;
}

export interface CollectorActions {
  setQuantity: (id: string, n: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  resetCollection: () => void;
}

const initialState: CollectorState = {
  owned: {},
};

export const useCollectorStore = create<CollectorState & CollectorActions>()(
  persist(
    (set) => ({
      ...initialState,
      setQuantity: (id, n) =>
        set((state) => ({
          owned: { ...state.owned, [id]: Math.max(0, n) },
        })),
      increment: (id) =>
        set((state) => ({
          owned: { ...state.owned, [id]: (state.owned[id] ?? 0) + 1 },
        })),
      decrement: (id) =>
        set((state) => {
          const current = state.owned[id] ?? 0;
          if (current <= 0) return state;
          return {
            owned: { ...state.owned, [id]: current - 1 },
          };
        }),
      resetCollection: () => set(initialState),
    }),
    {
      name: 'collector-storage',
    }
  )
);
