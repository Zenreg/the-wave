import { useState, useEffect } from 'react';
import type { TimezoneBand, TzBandState } from '../types';

/** All integer UTC offsets from -12 to +14 */
const OFFSETS = Array.from({ length: 27 }, (_, i) => i - 12);

export function computeBandState(offset: number, now: Date): TzBandState {
  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();

  // What hour is it in this timezone?
  const localHour = ((utcHour + offset) % 24 + 24) % 24;
  // For integer offsets, local minute = UTC minute
  const localMinute = utcMinute;

  // Within the ±5min action window (19:55–20:05)
  const inWindow =
    (localHour === 19 && localMinute >= 55) ||
    (localHour === 20 && localMinute <= 5);

  if (inWindow) {
    return 'active';
  }

  // Past the window today (20:06–23:59) or past midnight (0:00–7:59)
  if (localHour === 20 ? localMinute > 5 : (localHour > 20 || localHour < 8)) {
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

/** Longitude where it's currently 20:00, moving westward continuously */
export function computeWaveCenterLng(now: Date): number {
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const utcS = now.getUTCSeconds();
  const utcDecimal = utcH + utcM / 60 + utcS / 3600;

  // UTC offset where local time = 20:00 → offset = 20 - utcDecimal
  // Longitude = offset * 15°
  let lng = (20 - utcDecimal) * 15;

  // Normalize to [-180, 180]
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return lng;
}

export function useTimezoneWave() {
  const [bands, setBands] = useState<TimezoneBand[]>(() => computeAllBands(new Date()));
  const [waveCenterLng, setWaveCenterLng] = useState<number>(() => computeWaveCenterLng(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setBands(computeAllBands(now));
      setWaveCenterLng(computeWaveCenterLng(now));
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

  return { bands, waveCenterLng, updateParticipantCount, incrementParticipantCount };
}
