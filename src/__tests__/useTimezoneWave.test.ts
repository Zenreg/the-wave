import { describe, it, expect } from 'vitest';
import { computeBandState, computeAllBands } from '../hooks/useTimezoneWave';

describe('useTimezoneWave', () => {
  describe('computeBandState', () => {
    it('returns "active" when local time is 20:xx in that timezone', () => {
      // UTC 12:00 → offset +8 → local 20:00
      const now = new Date('2026-02-12T12:00:00Z');
      expect(computeBandState(8, now)).toBe('active');
    });

    it('returns "done" when local time is past 20 (e.g., 21:00)', () => {
      // UTC 12:00 → offset +9 → local 21:00
      const now = new Date('2026-02-12T12:00:00Z');
      expect(computeBandState(9, now)).toBe('done');
    });

    it('returns "done" for early morning hours (past midnight, did it last night)', () => {
      // UTC 12:00 → offset -9 → local 03:00
      const now = new Date('2026-02-12T12:00:00Z');
      expect(computeBandState(-9, now)).toBe('done');
    });

    it('returns "future" when local time is before 20:00 (e.g., 15:00)', () => {
      // UTC 12:00 → offset +3 → local 15:00
      const now = new Date('2026-02-12T12:00:00Z');
      expect(computeBandState(3, now)).toBe('future');
    });

    it('returns "future" when local time is morning (e.g., 10:00)', () => {
      // UTC 12:00 → offset -2 → local 10:00
      const now = new Date('2026-02-12T12:00:00Z');
      expect(computeBandState(-2, now)).toBe('future');
    });

    it('handles negative offsets correctly', () => {
      // UTC 04:00 → offset -12 → local 16:00 (future)
      const now = new Date('2026-02-12T04:00:00Z');
      expect(computeBandState(-12, now)).toBe('future');
    });

    it('handles UTC+14 (Line Islands)', () => {
      // UTC 06:00 → offset +14 → local 20:00 (active)
      const now = new Date('2026-02-12T06:00:00Z');
      expect(computeBandState(14, now)).toBe('active');
    });

    it('handles UTC+5.5 (Inde) — offset demi-heure', () => {
      // UTC 14:30 → offset +5.5 → local 20:00 (active)
      const now = new Date('2026-02-12T14:30:00Z');
      expect(computeBandState(5.5, now)).toBe('active');
    });

    it('handles UTC+5.75 (Népal) — offset 45 min', () => {
      // UTC 14:15 → offset +5.75 → local 20:00 (active)
      const now = new Date('2026-02-12T14:15:00Z');
      expect(computeBandState(5.75, now)).toBe('active');
    });

    it('handles UTC-3.5 (Terre-Neuve) — offset demi-heure négatif', () => {
      // UTC 23:30 → offset -3.5 → local 20:00 (active)
      const now = new Date('2026-02-12T23:30:00Z');
      expect(computeBandState(-3.5, now)).toBe('active');
    });

    it('UTC+5.5 returns "future" avant 20h', () => {
      // UTC 12:00 → offset +5.5 → local 17:30 (future)
      const now = new Date('2026-02-12T12:00:00Z');
      expect(computeBandState(5.5, now)).toBe('future');
    });

    it('UTC+5.5 returns "done" après 20h', () => {
      // UTC 15:00 → offset +5.5 → local 20:30 (done)
      const now = new Date('2026-02-12T15:00:00Z');
      expect(computeBandState(5.5, now)).toBe('done');
    });
  });

  describe('computeAllBands', () => {
    it('returns 38 bands (integers + demi-heures)', () => {
      const bands = computeAllBands(new Date('2026-02-12T12:00:00Z'));
      expect(bands).toHaveLength(38);
    });

    it('has offsets from -12 to +14', () => {
      const bands = computeAllBands(new Date('2026-02-12T12:00:00Z'));
      expect(bands[0].offset).toBe(-12);
      expect(bands[bands.length - 1].offset).toBe(14);
    });

    it('always has at least one active band', () => {
      const bands = computeAllBands(new Date('2026-02-12T12:00:00Z'));
      const activeBands = bands.filter(b => b.state === 'active');
      expect(activeBands.length).toBeGreaterThanOrEqual(1);
    });

    it('initializes all participantCounts to 0', () => {
      const bands = computeAllBands(new Date('2026-02-12T12:00:00Z'));
      expect(bands.every(b => b.participantCount === 0)).toBe(true);
    });
  });
});
