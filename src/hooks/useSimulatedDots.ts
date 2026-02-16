import { useState, useEffect, useRef } from 'react';
import type { MapDot } from '../types';

/** Weighted random latitude — favors populated areas (20°N–55°N) */
function randomLat(): number {
  // 70% chance in northern populated band, 30% elsewhere
  if (Math.random() < 0.7) {
    return 20 + Math.random() * 35; // 20°N – 55°N
  }
  return -40 + Math.random() * 100; // -40° – 60°
}

/** Normalize longitude to [-180, 180] */
function normLng(lng: number): number {
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return lng;
}

/**
 * Simulate random participant dots appearing on the map.
 * Activated by ?sim=1 in the URL.
 */
export function useSimulatedDots(waveCenterLng: number, enabled: boolean): MapDot[] {
  const [dots, setDots] = useState<MapDot[]>([]);
  const centerRef = useRef(waveCenterLng);

  useEffect(() => {
    centerRef.current = waveCenterLng;
  }, [waveCenterLng]);

  useEffect(() => {
    if (!enabled) return;

    // Seed: scatter dots behind the wave (already-swept region)
    const seed: MapDot[] = [];
    const c = centerRef.current;
    for (let i = 0; i < 60; i++) {
      const behind = Math.random() * 150; // up to 150° behind
      const lng = normLng(c + 7.5 + behind);
      seed.push({ id: `sim-${i}`, point: { lat: randomLat(), lng }, timestamp: Date.now() });
    }
    setDots(seed);

    // Every 1–3s, add a new dot inside the band
    let n = 200;
    const tick = () => {
      const cc = centerRef.current;
      const lng = normLng(cc + (Math.random() - 0.5) * 15);
      setDots(prev => [
        ...prev,
        { id: `sim-${n++}`, point: { lat: randomLat(), lng }, timestamp: Date.now() },
      ]);
      timer = window.setTimeout(tick, 800 + Math.random() * 2200);
    };
    let timer = window.setTimeout(tick, 500);

    return () => clearTimeout(timer);
  }, [enabled]);

  return dots;
}
