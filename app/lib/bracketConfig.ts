import bracketMapping from '../data/bracketMapping.json';
import { groups } from '../data/worldCupData';
import type { SimulationState } from './simulationStore';

type RawMapping = typeof bracketMapping;
type RawRoundOf32Match = RawMapping['round_of_32'][number];
type RawRoundSide =
  | { group_position: number; group: keyof typeof groups }
  | { third_place_options: string[] };
type RawKnockoutMatch = RawMapping['round_of_16'][number];
type RawQuarterMatch = RawMapping['quarterfinals'][number];
type RawSemifinalMatch = RawMapping['semifinals'][number];
type RawFinalMatch = RawMapping['final'];

export type TeamReference = {
  group?: string;
  pos?: string;
  isThird?: boolean;
  slot?: number;
  match?: string;
  slotId?: string;
  allowedGroups?: string[];
};

export type BracketMatch = {
  id: string;
  home: TeamReference;
  away: TeamReference;
};

type NormalizedBracket = {
  roundOf32: BracketMatch[];
  roundOf16: BracketMatch[];
  quarterfinals: BracketMatch[];
  semifinals: BracketMatch[];
  final: BracketMatch;
};

export type ThirdPlaceSlot = {
  slotId: string;
  matchId: string;
  allowedGroups: string[];
};

const normalizeBracket = (
  raw: RawMapping
): { bracket: NormalizedBracket; slots: ThirdPlaceSlot[] } => {
  const idMap = new Map<number | string, string>();
  const registerId = (rawId: number | string) => {
    const normalized = typeof rawId === 'number' ? `M${rawId}` : String(rawId).toUpperCase();
    idMap.set(rawId, normalized);
    return normalized;
  };
  const readId = (rawId: number | string) => idMap.get(rawId) ?? registerId(rawId);
  const thirdSlots: ThirdPlaceSlot[] = [];

  const normalizeRoundSide = (
    slot: RawRoundSide,
    slotId: string,
    matchId: string
  ): TeamReference => {
    if ('third_place_options' in slot) {
      const allowedGroups = slot.third_place_options;
      thirdSlots.push({ slotId, matchId, allowedGroups });
      return {
        isThird: true,
        slotId,
        allowedGroups,
      };
    }

    if ('group' in slot && 'group_position' in slot) {
      return { group: slot.group, pos: String(slot.group_position) };
    }

    return {};
  };

  const normalizeRoundOf32 = (matches: RawRoundOf32Match[]): BracketMatch[] =>
    matches.map((match) => {
      const id = registerId(match.match);
      return {
        id,
        home: normalizeRoundSide(match.home as RawRoundSide, `${id}-home`, id),
        away: normalizeRoundSide(match.away as RawRoundSide, `${id}-away`, id),
      };
    });

  const normalizeKnockoutMatch = (
    match: RawKnockoutMatch | RawQuarterMatch | RawSemifinalMatch | RawFinalMatch
  ): BracketMatch => ({
    id: registerId(match.match),
    home: { match: readId(match.home_from_match) },
    away: { match: readId(match.away_from_match) },
  });

  const roundOf32 = normalizeRoundOf32(raw.round_of_32);
  const roundOf16 = raw.round_of_16.map(normalizeKnockoutMatch);
  const quarterfinals = raw.quarterfinals.map(normalizeKnockoutMatch);
  const semifinals = raw.semifinals.map(normalizeKnockoutMatch);
  const final = normalizeKnockoutMatch(raw.final);

  return { bracket: { roundOf32, roundOf16, quarterfinals, semifinals, final }, slots: thirdSlots };
};

const { bracket: normalizedBracket, slots: normalizedThirdSlots } = normalizeBracket(bracketMapping);

export const FINAL_MATCH_ID = normalizedBracket.final.id;
export const thirdPlaceSlots = normalizedThirdSlots;

const BRACKET_ROUNDS_META = [
  { key: 'roundOf32', title: '16 avos de final', shareLabel: 'R32' },
  { key: 'roundOf16', title: 'Oitavas de Final', shareLabel: 'R16' },
  { key: 'quarterfinals', title: 'Quartas de Final', shareLabel: 'QF' },
  { key: 'semifinals', title: 'Semifinais', shareLabel: 'SF' },
  { key: 'final', title: 'Final', shareLabel: 'Final' },
] as const;

type RoundMeta = (typeof BRACKET_ROUNDS_META)[number];
type NonFinalKey = Exclude<RoundMeta['key'], 'final'>;

export const bracketRounds = BRACKET_ROUNDS_META.map((round) => ({
  ...round,
  matches:
    round.key === 'final'
      ? [normalizedBracket.final]
      : (normalizedBracket[round.key as NonFinalKey] as BracketMatch[]),
}));

export const resolveTeamId = (
  ref: TeamReference,
  simulation: SimulationState['simulation'],
  thirdAssignments?: Record<string, string>
): string | undefined => {
  if (ref.match) {
    return simulation.bracket[ref.match]?.winner;
  }

  if (ref.isThird) {
    if (!thirdAssignments || !ref.slotId) {
      return undefined;
    }
    return thirdAssignments[ref.slotId];
  }

  if (ref.group && ref.pos) {
    return simulation.groupSelections[ref.group]?.[ref.pos];
  }

  return undefined;
};
