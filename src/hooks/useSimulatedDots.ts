import { useState, useEffect } from 'react';
import type { MapDot } from '../types';

/** Major world cities spread across all timezones */
const CITIES = [
  { lat: 21.31, lng: -157.86 },  // Honolulu
  { lat: 61.22, lng: -149.90 },  // Anchorage
  { lat: 34.05, lng: -118.24 },  // Los Angeles
  { lat: 37.77, lng: -122.42 },  // San Francisco
  { lat: 49.28, lng: -123.12 },  // Vancouver
  { lat: 47.61, lng: -122.33 },  // Seattle
  { lat: 33.45, lng: -112.07 },  // Phoenix
  { lat: 39.74, lng: -104.99 },  // Denver
  { lat: 19.43, lng: -99.13 },   // Mexico City
  { lat: 41.88, lng: -87.63 },   // Chicago
  { lat: 29.76, lng: -95.37 },   // Houston
  { lat: 40.71, lng: -74.01 },   // New York
  { lat: 25.76, lng: -80.19 },   // Miami
  { lat: 43.65, lng: -79.38 },   // Toronto
  { lat: 45.50, lng: -73.57 },   // Montreal
  { lat: -12.05, lng: -77.04 },  // Lima
  { lat: 4.71, lng: -74.07 },    // Bogota
  { lat: 10.49, lng: -66.88 },   // Caracas
  { lat: -22.91, lng: -43.17 },  // Rio de Janeiro
  { lat: -23.55, lng: -46.63 },  // São Paulo
  { lat: -34.60, lng: -58.38 },  // Buenos Aires
  { lat: 14.69, lng: -17.44 },   // Dakar
  { lat: 51.51, lng: -0.13 },    // London
  { lat: 38.72, lng: -9.14 },    // Lisbon
  { lat: 48.86, lng: 2.35 },     // Paris
  { lat: 52.52, lng: 13.41 },    // Berlin
  { lat: 41.39, lng: 2.17 },     // Barcelona
  { lat: 40.42, lng: -3.70 },    // Madrid
  { lat: 41.90, lng: 12.50 },    // Rome
  { lat: 6.52, lng: 3.38 },      // Lagos
  { lat: 48.21, lng: 16.37 },    // Vienna
  { lat: 59.33, lng: 18.07 },    // Stockholm
  { lat: 30.04, lng: 31.24 },    // Cairo
  { lat: -33.92, lng: 18.42 },   // Cape Town
  { lat: 50.45, lng: 30.52 },    // Kyiv
  { lat: 55.76, lng: 37.62 },    // Moscow
  { lat: 41.01, lng: 28.98 },    // Istanbul
  { lat: -1.29, lng: 36.82 },    // Nairobi
  { lat: 24.71, lng: 46.68 },    // Riyadh
  { lat: 25.20, lng: 55.27 },    // Dubai
  { lat: 28.61, lng: 77.21 },    // New Delhi
  { lat: 19.08, lng: 72.88 },    // Mumbai
  { lat: 24.86, lng: 67.01 },    // Karachi
  { lat: 23.81, lng: 90.41 },    // Dhaka
  { lat: 13.76, lng: 100.50 },   // Bangkok
  { lat: 10.82, lng: 106.63 },   // Ho Chi Minh City
  { lat: 39.90, lng: 116.40 },   // Beijing
  { lat: 31.23, lng: 121.47 },   // Shanghai
  { lat: 22.32, lng: 114.17 },   // Hong Kong
  { lat: 1.35, lng: 103.82 },    // Singapore
  { lat: -6.21, lng: 106.85 },   // Jakarta
  { lat: 35.68, lng: 139.69 },   // Tokyo
  { lat: 37.57, lng: 126.98 },   // Seoul
  { lat: -33.87, lng: 151.21 },  // Sydney
  { lat: -37.81, lng: 144.96 },  // Melbourne
  { lat: -36.85, lng: 174.76 },  // Auckland
];

/** Local decimal hour at a given longitude */
function localHourAt(lng: number, now: Date): number {
  const utcDecimal = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
  return ((utcDecimal + lng / 15) % 24 + 24) % 24;
}

/** Is this city's local time past the 20h window? (done = behind the wave) */
function isDone(lng: number, now: Date): boolean {
  const h = localHourAt(lng, now);
  return h > 20.083; // only evening (20:05–23:59), NOT past midnight
}

/** Is this city currently in the active 20h window? */
function isActive(lng: number, now: Date): boolean {
  const h = localHourAt(lng, now);
  return h >= 19.917 && h <= 20.083; // 19:55–20:05
}

/** Small random offset to simulate multiple people in a city */
function jitter(): number {
  return (Math.random() - 0.5) * 1; // ±0.5°
}

/**
 * Simulate realistic participant dots appearing on cities
 * behind and inside the wave band.
 */
export function useSimulatedDots(enabled: boolean): MapDot[] {
  const [dots, setDots] = useState<MapDot[]>([]);

  useEffect(() => {
    if (!enabled) {
      setDots([]);
      return;
    }

    // Seed: place dots on cities already behind the wave
    const now = new Date();
    const seed: MapDot[] = [];
    let id = 0;

    for (const city of CITIES) {
      if (isDone(city.lng, now)) {
        const count = 2 + Math.floor(Math.random() * 5); // 2–6 dots per city
        for (let i = 0; i < count; i++) {
          seed.push({
            id: `sim-${id++}`,
            point: { lat: city.lat + jitter(), lng: city.lng + jitter() },
            timestamp: Date.now(),
          });
        }
      }
    }
    setDots(seed);

    // Periodically add new dots on active cities
    let counter = 1000;
    const tick = () => {
      const now = new Date();
      const activeCities = CITIES.filter(c => isActive(c.lng, now));

      if (activeCities.length > 0) {
        const city = activeCities[Math.floor(Math.random() * activeCities.length)];
        setDots(prev => [
          ...prev,
          {
            id: `sim-${counter++}`,
            point: { lat: city.lat + jitter(), lng: city.lng + jitter() },
            timestamp: Date.now(),
          },
        ]);
      }
      timer = window.setTimeout(tick, 800 + Math.random() * 2200);
    };
    let timer = window.setTimeout(tick, 300);

    return () => clearTimeout(timer);
  }, [enabled]);

  return dots;
}
