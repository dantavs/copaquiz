import { thirdPlaceSlots } from './bracketConfig';
import type { SimulationState } from './simulationStore';

type ThirdTeam = {
  teamId: string;
  group: string;
};

const SLOT_COUNT = thirdPlaceSlots.length;

const findGroupForTeam = (
  simulation: SimulationState['simulation'],
  teamId: string
): string | undefined => {
  for (const [groupLetter, positions] of Object.entries(simulation.groupSelections)) {
    if (positions['3'] === teamId) {
      return groupLetter;
    }
  }
  return undefined;
};

export const assignThirdPlacements = (
  simulation: SimulationState['simulation']
): Record<string, string> => {
  if (simulation.topThirds.length !== SLOT_COUNT) {
    return {};
  }

  const thirdTeams: ThirdTeam[] = simulation.topThirds
    .map((teamId) => {
      const group = findGroupForTeam(simulation, teamId);
      if (!group) {
        return null;
      }
      return { teamId, group };
    })
    .filter((value): value is ThirdTeam => Boolean(value));

  if (thirdTeams.length !== SLOT_COUNT) {
    return {};
  }

  const slotAssignments: Record<string, string> = {};
  const teamById = new Map(thirdTeams.map((team) => [team.teamId, team]));

  const tryMatch = (team: ThirdTeam, visited: Set<string>): boolean => {
    for (const slot of thirdPlaceSlots) {
      if (!slot.allowedGroups.includes(team.group)) {
        continue;
      }

      if (visited.has(slot.slotId)) {
        continue;
      }

      visited.add(slot.slotId);
      const currentTeamId = slotAssignments[slot.slotId];
      if (!currentTeamId || tryMatch(teamById.get(currentTeamId)!, visited)) {
        slotAssignments[slot.slotId] = team.teamId;
        return true;
      }
    }
    return false;
  };

  for (const team of thirdTeams) {
    const visited = new Set<string>();
    if (!tryMatch(team, visited)) {
      return {};
    }
  }

  return slotAssignments;
};
