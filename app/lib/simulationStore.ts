import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definição dos tipos conforme TICKET-003
export interface Team {
  id: string;
  name: string;
  flag: string;
}

export interface SimulationState {
  teams: Record<string, Team>;
  groups: Record<string, string[]>;
  simulation: {
    groupSelections: Record<string, Record<string, string>>;
    topThirds: string[];
    bracket: Record<string, { winner: string }>;
  };
}

export interface SimulationActions {
  setGroupSelection: (group: string, position: string, teamId: string) => void;
  setGroupSelections: (group: string, selections: Record<string, string>) => void;
  setTopThird: (teamId: string, isSelected: boolean) => void;
  setMatchWinner: (matchId: string, teamId: string) => void;
  resetSimulation: () => void;
}

import { groups, teams } from '../data/worldCupData';

// ...

const initialState: SimulationState = {
  teams: teams,
  groups: groups,
  simulation: {
    groupSelections: {},
    topThirds: [],
    bracket: {},
  },
};

const getValidThirdPlacedTeams = (groupSelections: Record<string, Record<string, string>>) => {
  return Object.values(groupSelections)
    .map((positions) => positions['3'])
    .filter((teamId): teamId is string => Boolean(teamId));
};

export const useSimulationStore = create<SimulationState & SimulationActions>()(
  persist(
    (set) => ({
      ...initialState,
      setGroupSelection: (group, position, teamId) =>
        set((state) => ({
          simulation: {
            ...state.simulation,
            groupSelections: {
              ...state.simulation.groupSelections,
              [group]: {
                ...state.simulation.groupSelections[group],
                [position]: teamId,
              },
            },
          },
        })),
      setGroupSelections: (group, selections) =>
        set((state) => {
          const newGroupSelections = {
            ...state.simulation.groupSelections,
            [group]: selections,
          };

          // Cleanup topThirds: keep only those who are still 3rd in some group
          const allThirds = Object.values(newGroupSelections)
            .map((pos) => pos['3'])
            .filter(Boolean) as string[];

          const newTopThirds = state.simulation.topThirds.filter((id) =>
            allThirds.includes(id)
          );

          return {
            simulation: {
              ...state.simulation,
              groupSelections: newGroupSelections,
              topThirds: newTopThirds,
              bracket: {},
            },
          };
        }),
      setTopThird: (teamId, isSelected) =>
        set((state) => {
          const { topThirds } = state.simulation;
          const newTopThirds = isSelected
            ? [...new Set([...topThirds, teamId])]
            : topThirds.filter((id) => id !== teamId);
          return {
            simulation: {
              ...state.simulation,
              topThirds: newTopThirds,
            },
          };
        }),
      setMatchWinner: (matchId, teamId) =>
        set((state) => ({
          simulation: {
            ...state.simulation,
            bracket: {
              ...state.simulation.bracket,
              [matchId]: { winner: teamId },
            },
          },
        })),
      resetSimulation: () => set(initialState),
    }),
    {
      name: 'simulation-storage', // nome no localStorage
    }
  )
);
