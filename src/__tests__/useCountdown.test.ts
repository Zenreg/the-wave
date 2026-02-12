import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSecondsUntilNext8PM, isWithinActionWindow, isActionWindowPast } from '../hooks/useCountdown';

describe('useCountdown helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getSecondsUntilNext8PM', () => {
    it('returns correct seconds when before 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 18, 0, 0)); // 18:00
      expect(getSecondsUntilNext8PM()).toBe(7200); // 2 hours
    });

    it('returns seconds until tomorrow 20:00 when past 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 21, 0, 0)); // 21:00
      expect(getSecondsUntilNext8PM()).toBe(23 * 3600); // 23 hours
    });

    it('returns seconds until tomorrow 20:00 at exactly 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 0)); // 20:00:00
      // At exactly 20:00:00, now >= target, so it counts to tomorrow
      expect(getSecondsUntilNext8PM()).toBe(24 * 3600);
    });

    it('returns correct seconds at midnight', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 0, 0, 0)); // 00:00
      expect(getSecondsUntilNext8PM()).toBe(20 * 3600); // 20 hours
    });

    it('returns correct seconds at noon', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 12, 0, 0)); // 12:00
      expect(getSecondsUntilNext8PM()).toBe(8 * 3600); // 8 hours
    });
  });

  describe('isWithinActionWindow', () => {
    it('returns true at 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 30)); // 20:00:30
      expect(isWithinActionWindow()).toBe(true);
    });

    it('returns false at 20:01', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 1, 0)); // 20:01
      expect(isWithinActionWindow()).toBe(false);
    });

    it('returns false at 19:59', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 59, 59));
      expect(isWithinActionWindow()).toBe(false);
    });
  });

  describe('isActionWindowPast', () => {
    it('returns false before 20:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 19, 30, 0));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns false during 20:00 (the window)', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 0, 30));
      expect(isActionWindowPast()).toBe(false);
    });

    it('returns true at 20:01', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 20, 1, 0));
      expect(isActionWindowPast()).toBe(true);
    });

    it('returns true at 21:00', () => {
      vi.setSystemTime(new Date(2026, 1, 12, 21, 0, 0));
      expect(isActionWindowPast()).toBe(true);
    });
  });
});
