import { useState, useEffect } from 'react';
import type { TimezoneBand, TzBandState } from '../types';

/** All integer UTC offsets from -12 to +14 */
const OFFSETS = Array.from({ length: 27 }, (_, i) => i - 12);

export function computeBandState(offset: number, now: Date): TzBandState {
  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();

  // What hour is it in this timezone?
  const localHour = ((utcHour + offset) % 24 + 24) % 24;

  // Within the action window (20:00–20:00:59)
  if (localHour === 20 && utcMinute === now.getUTCMinutes()) {
    // Need to check if the local minute is 0
    // Since offset only shifts hours (for integer offsets), local minute = UTC minute
    if (utcMinute === 0) {
      // Exact match: but the window is 20:00:00-20:00:59
      // Actually we consider the full hour 20 as "recently done" for visual effect
    }
  }

  // Simplified: localHour === 20 means "active or just done"
  if (localHour === 20) {
    return 'active';
  }

  // Past 20:00 today (21-23) or past midnight (0-7 = did it "last night")
  if (localHour > 20 || localHour < 8) {
    return 'done';
  }

  return 'future';
}

export function computeAllBands(now: Date): TimezoneBand[] {
  return OFFSETS.map(offset => ({
    offset,
    state: computeBandState(offset, now),
    participantCount: 0,
  }));
}

export function useTimezoneWave() {
  const [bands, setBands] = useState<TimezoneBand[]>(() => computeAllBands(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setBands(computeAllBands(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateParticipantCount = (tzOffset: number, count: number) => {
    setBands(prev => prev.map(band =>
      band.offset === tzOffset ? { ...band, participantCount: count } : band
    ));
  };

  const incrementParticipantCount = (tzOffset: number) => {
    setBands(prev => prev.map(band =>
      band.offset === tzOffset ? { ...band, participantCount: band.participantCount + 1 } : band
    ));
  };

  return { bands, updateParticipantCount, incrementParticipantCount };
}
