export interface TrophyTier {
  id: string;
  label: string;
  threshold: number;
  emoji: string;
  color: string;
}

export interface TrophyState extends TrophyTier {
  unlocked: boolean;
}

export interface StreakProgressInfo {
  percentage: number;
  nextLabel: string;
  remainingWins: number;
  currentTierLabel: string;
}

export const TROPHY_TIERS: TrophyTier[] = [
  { id: 'bronze', label: 'Bronze', threshold: 3, emoji: '🥉', color: '#cd7f32' },
  { id: 'silver', label: 'Prata', threshold: 5, emoji: '🥈', color: '#c0c0c0' },
  { id: 'gold', label: 'Ouro', threshold: 10, emoji: '🥇', color: '#f5c518' }
];

const LEGEND_LABEL = 'Lenda';

export function calculateStreakProgress(currentStreak: number): StreakProgressInfo {
  const safeStreak = Math.max(0, currentStreak);

  const tiersByThreshold = [...TROPHY_TIERS].sort((a, b) => a.threshold - b.threshold);
  const nextTier = tiersByThreshold.find(tier => safeStreak < tier.threshold);
  const achievedTiers = tiersByThreshold.filter(tier => safeStreak >= tier.threshold);
  const currentTier = achievedTiers[achievedTiers.length - 1];
  const previousThreshold = currentTier ? currentTier.threshold : 0;

  if (!nextTier) {
    return {
      percentage: 100,
      nextLabel: LEGEND_LABEL,
      remainingWins: 0,
      currentTierLabel: currentTier ? currentTier.label : 'Iniciante'
    };
  }

  const span = nextTier.threshold - previousThreshold || nextTier.threshold;
  const delta = safeStreak - previousThreshold;
  const percentage = Math.min(100, (delta / span) * 100);
  const remainingWins = Math.max(0, nextTier.threshold - safeStreak);

  return {
    percentage,
    nextLabel: nextTier.label,
    remainingWins,
    currentTierLabel: currentTier ? currentTier.label : 'Iniciante'
  };
}

export function getTrophyStates(bestStreak: number): TrophyState[] {
  const safeBest = Math.max(0, bestStreak);
  return TROPHY_TIERS.map(tier => ({
    ...tier,
    unlocked: safeBest >= tier.threshold
  }));
}
