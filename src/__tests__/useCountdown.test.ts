import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSecondsUntilWindow, isWithinActionWindow, isActionWindowPast } from '../hooks/useCountdown';

describe('useCountdown helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getSecondsUntilWindow (cible 19:55)', () => {
    it('returns correct seconds when before 19:55', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 18, 0, 0)); // 18:00
      expect(getSecondsUntilWindow()).toBe(1 * 3600 + 55 * 60); // 1h55min = 6900s
    });

    it('returns seconds until tomorrow 19:55 when past 19:55', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 21, 0, 0)); // 21:00
      expect(getSecondsUntilWindow()).toBe(22 * 3600 + 55 * 60); // 22h55min
    });

    it('returns seconds until tomorrow 19:55 at exactly 19:55', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 55, 0)); // 19:55:00
      // now >= target → compte jusqu'à demain
      expect(getSecondsUntilWindow()).toBe(24 * 3600);
    });

    it('returns correct seconds at midnight', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 0, 0, 0)); // 00:00
      expect(getSecondsUntilWindow()).toBe(19 * 3600 + 55 * 60); // 19h55min
    });

    it('returns correct seconds at noon', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 12, 0, 0)); // 12:00
      expect(getSecondsUntilWindow()).toBe(7 * 3600 + 55 * 60); // 7h55min
    });
  });

  describe('isWithinActionWindow (19:55–20:05)', () => {
    it('returns true at 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 30)); // 20:00:30
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 19:55 (début fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 55, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 20:05 (fin fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 5, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 20:01 (dans la fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 1, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 19:59 (dans la fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 59, 59));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns false at 19:54 (avant fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 54, 59));
      expect(isWithinActionWindow()).toBe(false);
    });

    it('returns false at 20:06 (après fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 6, 0));
      expect(isWithinActionWindow()).toBe(false);
    });
  });

  describe('isActionWindowPast (après 20:05)', () => {
    it('returns false before 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 30, 0));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns false during window (20:00)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 30));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns false at 20:05 (encore dans la fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 5, 0));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns true at 20:06 (juste après fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 6, 0));
      expect(isActionWindowPast()).toBe(true);
    });

    it('returns true at 21:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 21, 0, 0));
      expect(isActionWindowPast()).toBe(true);
    });
  });
});
