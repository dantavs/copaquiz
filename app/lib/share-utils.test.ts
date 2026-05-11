import { describe, expect, it } from 'vitest';

import { buildShareText } from './share-utils';
import { bracketRounds, FINAL_MATCH_ID, resolveTeamId } from './bracketConfig';
import { groups } from '../data/worldCupData';
import type { SimulationState } from './simulationStore';
import { assignThirdPlacements } from './thirdPlaceAllocator';

const createSimulation = (): SimulationState['simulation'] => {
  const groupSelections: SimulationState['simulation']['groupSelections'] = {};

  Object.entries(groups).forEach(([groupLetter, teamIds]) => {
    groupSelections[groupLetter] = {
      '1': teamIds[0],
      '2': teamIds[1],
      '3': teamIds[2],
      '4': teamIds[3],
    };
  });

  const thirdPlaced = Object.values(groupSelections)
    .map((positions) => positions['3'])
    .filter((id): id is string => Boolean(id));

  return {
    groupSelections,
    topThirds: thirdPlaced.slice(0, 8),
    bracket: {},
  };
};

const fillBracketWinners = (simulation: SimulationState['simulation']) => {
  const thirdAssignments = assignThirdPlacements(simulation);
  bracketRounds.forEach((round) => {
    round.matches.forEach((match) => {
      const homeId = resolveTeamId(match.home, simulation, thirdAssignments);
      const awayId = resolveTeamId(match.away, simulation, thirdAssignments);
      const winner = homeId ?? awayId;
      if (!winner) {
        throw new Error(`Missing participant for match ${match.id}`);
      }
      simulation.bracket[match.id] = { winner };
    });
  });
};

describe('buildShareText', () => {
  it('returns null when champion is not decided', () => {
    const simulation = createSimulation();
    const result = buildShareText(simulation, { url: 'https://example.com' });
    expect(result).toBeNull();
  });

  it('builds a formatted summary covering all rounds when champion exists', () => {
    const simulation = createSimulation();
    fillBracketWinners(simulation);
    expect(simulation.bracket[FINAL_MATCH_ID]?.winner).toBeTruthy();

    const result = buildShareText(simulation, { url: 'https://example.com' });
    expect(result).not.toBeNull();
    expect(result).toMatch(/R32:/);
    expect(result).toMatch(/R16:/);
    expect(result).toMatch(/QF:/);
    expect(result).toMatch(/SF:/);
    expect(result).toMatch(/Final:/);
    expect(result).toMatch(/🥇 CAMPEÃO/);
    expect(result).toMatch(/https:\/\/example.com/);
  });
});
