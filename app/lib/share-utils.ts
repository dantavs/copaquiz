import { bracketRounds, FINAL_MATCH_ID, resolveTeamId, type BracketMatch } from './bracketConfig';
import { teams as defaultTeams } from '../data/worldCupData';
import type { SimulationState } from './simulationStore';
import { assignThirdPlacements } from './thirdPlaceAllocator';

type TeamsMap = typeof defaultTeams;

export interface ShareTextOptions {
  url?: string;
  teams?: TeamsMap;
  thirdAssignments?: Record<string, string>;
}

const DEFAULT_URL = 'https://copaquiz.com/quiz/simulador';

const isNonNullable = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

const formatMatchResult = (
  match: BracketMatch,
  simulation: SimulationState['simulation'],
  teams: TeamsMap,
  thirdAssignments: Record<string, string>
): string | null => {
  const homeId = resolveTeamId(match.home, simulation, thirdAssignments);
  const awayId = resolveTeamId(match.away, simulation, thirdAssignments);
  const winnerId = simulation.bracket[match.id]?.winner;

  if (!homeId || !awayId || !winnerId) {
    return null;
  }

  const loserId = winnerId === homeId ? awayId : homeId;
  const winnerName = teams[winnerId as keyof TeamsMap]?.name ?? '—';
  const loserName = teams[loserId as keyof TeamsMap]?.name ?? '—';

  return `${winnerName} > ${loserName}`;
};

export const buildShareText = (
  simulation: SimulationState['simulation'],
  options: ShareTextOptions = {}
): string | null => {
  const championId = simulation.bracket[FINAL_MATCH_ID]?.winner;
  if (!championId) {
    return null;
  }

  const teams = options.teams ?? defaultTeams;
  const url = options.url ?? DEFAULT_URL;
  const thirdAssignments = options.thirdAssignments ?? assignThirdPlacements(simulation);
  const lines: string[] = ['🏆 Meu Simulador Copa 2026!', ''];

  bracketRounds.forEach(({ shareLabel, matches }) => {
    const summaries = matches
      .map((match) => formatMatchResult(match, simulation, teams, thirdAssignments))
      .filter(isNonNullable);

    if (summaries.length) {
      lines.push(`${shareLabel}: ${summaries.join(', ')}`);
    }
  });

  const championName = teams[championId as keyof TeamsMap]?.name ?? '—';
  lines.push('', `🥇 CAMPEÃO: ${championName}!`);
  lines.push('', `Simule você também: ${url}`);

  return lines.join('\n');
};
