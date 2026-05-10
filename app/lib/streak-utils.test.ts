import { describe, expect, it } from 'vitest';
import { calculateStreakProgress, getTrophyStates, TROPHY_TIERS } from './streak-utils';

describe('calculateStreakProgress', () => {
  it('calculates progress towards the first tier', () => {
    const progress = calculateStreakProgress(1);
    expect(progress.nextLabel).toBe('Bronze');
    expect(progress.remainingWins).toBe(2);
    expect(progress.percentage).toBeCloseTo((1 / TROPHY_TIERS[0].threshold) * 100, 5);
  });

  it('marks full progress when surpassing final tier', () => {
    const progress = calculateStreakProgress(12);
    expect(progress.nextLabel).toBe('Lenda');
    expect(progress.remainingWins).toBe(0);
    expect(progress.percentage).toBe(100);
    expect(progress.currentTierLabel).toBe('Ouro');
  });
});

describe('getTrophyStates', () => {
  it('unlocks trophies up to the best streak', () => {
    const states = getTrophyStates(5);
    expect(states[0].unlocked).toBe(true);
    expect(states[1].unlocked).toBe(true);
    expect(states[2].unlocked).toBe(false);
  });
});
