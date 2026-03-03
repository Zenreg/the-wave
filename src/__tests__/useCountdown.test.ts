import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSecondsUntilWindow, isWithinActionWindow, isActionWindowPast } from '../hooks/useCountdown';

describe('useCountdown helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getSecondsUntilWindow (cible 19:30)', () => {
    it('returns correct seconds when before 19:30', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 18, 0, 0)); // 18:00
      expect(getSecondsUntilWindow()).toBe(1 * 3600 + 30 * 60); // 1h30min = 5400s
    });

    it('returns seconds until tomorrow 19:30 when past 19:30', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 21, 0, 0)); // 21:00
      expect(getSecondsUntilWindow()).toBe(22 * 3600 + 30 * 60); // 22h30min
    });

    it('returns seconds until tomorrow 19:30 at exactly 19:30', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 30, 0)); // 19:30:00
      // now >= target → compte jusqu'à demain
      expect(getSecondsUntilWindow()).toBe(24 * 3600);
    });

    it('returns correct seconds at midnight', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 0, 0, 0)); // 00:00
      expect(getSecondsUntilWindow()).toBe(19 * 3600 + 30 * 60); // 19h30min
    });

    it('returns correct seconds at noon', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 12, 0, 0)); // 12:00
      expect(getSecondsUntilWindow()).toBe(7 * 3600 + 30 * 60); // 7h30min
    });
  });

  describe('isWithinActionWindow (19:30–20:30)', () => {
    it('returns true at 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 30)); // 20:00:30
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 19:30 (début fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 30, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 20:30 (fin fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 30, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 20:15 (dans la fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 15, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns true at 19:45 (dans la fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 45, 0));
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns false at 19:29 (avant fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 29, 59));
      expect(isWithinActionWindow()).toBe(false);
    });

    it('returns false at 20:31 (après fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 31, 0));
      expect(isWithinActionWindow()).toBe(false);
    });
  });

  describe('isActionWindowPast (après 20:30)', () => {
    it('returns false before 19:30', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 0, 0));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns false during window (20:00)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 30));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns false at 20:30 (encore dans la fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 30, 0));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns true at 20:31 (juste après fenêtre)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 31, 0));
      expect(isActionWindowPast()).toBe(true);
    });

    it('returns true at 21:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 21, 0, 0));
      expect(isActionWindowPast()).toBe(true);
    });
  });
});
