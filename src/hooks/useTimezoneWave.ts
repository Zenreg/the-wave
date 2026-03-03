import { useState, useEffect } from 'react';
import type { TimezoneBand, TzBandState } from '../types';

/** All real-world UTC offsets (integers + demi-heures) */
const OFFSETS = [
  -12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1,
  0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14,
];

export function computeBandState(offset: number, now: Date): TzBandState {
  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();

  // Temps local total en minutes depuis minuit
  const utcTotalMinutes = utcHour * 60 + utcMinute;
  const localTotalMinutes = ((utcTotalMinutes + offset * 60) % 1440 + 1440) % 1440;
  const localHour = Math.floor(localTotalMinutes / 60);
  const localMinute = localTotalMinutes % 60;

  // Within the 1h action window (19:30–20:30)
  const inWindow =
    (localHour === 19 && localMinute >= 30) ||
    (localHour === 20 && localMinute <= 30);

  if (inWindow) {
    return 'active';
  }

  // Past the window today (20:31–23:59) or past midnight (0:00–7:59)
  if (localHour === 20 ? localMinute > 30 : (localHour > 20 || localHour < 8)) {
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

/**
 * Longitude where it's currently 20:00, moving westward continuously.
 * correction = userLng - userOffset * 15 → aligne la barre sur la position
 * réelle de l'utilisateur à 20h heure civile (pas heure solaire).
 */
export function computeWaveCenterLng(now: Date, correction = 0): number {
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const utcS = now.getUTCSeconds();
  const utcDecimal = utcH + utcM / 60 + utcS / 3600;

  let lng = (20 - utcDecimal) * 15 + correction;

  // Normalize to [-180, 180]
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return lng;
}

export function useTimezoneWave(userLng?: number) {
  // Correction : aligne la barre sur la position réelle (pas solaire)
  const correction = userLng != null
    ? userLng - (-(new Date().getTimezoneOffset()) / 60) * 15
    : 0;

  const [bands, setBands] = useState<TimezoneBand[]>(() => computeAllBands(new Date()));
  const [waveCenterLng, setWaveCenterLng] = useState<number>(() => computeWaveCenterLng(new Date(), correction));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setBands(computeAllBands(now));
      setWaveCenterLng(computeWaveCenterLng(now, correction));
    }, 1000);
    return () => clearInterval(interval);
  }, [correction]);

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
