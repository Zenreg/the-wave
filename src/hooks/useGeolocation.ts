import { useState, useEffect } from 'react';
import type { GeoPoint } from '../types';

/**
 * Fallback: estimate position from timezone offset.
 * Longitude ~ offset * 15deg, latitude randomized in temperate zone.
 */
function estimateFromTimezone(): GeoPoint {
  const offsetHours = -new Date().getTimezoneOffset() / 60;
  return {
    lat: 35 + (Math.random() - 0.5) * 20,
    lng: offsetHours * 15,
  };
}

/**
 * Attempts browser Geolocation API silently.
 * Falls back to timezone-based estimation if denied or unavailable.
 */
export function useGeolocation() {
  // Start with timezone fallback immediately — refined by Geolocation API if available
  const [point, setPoint] = useState<GeoPoint>(() => estimateFromTimezone());

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPoint({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        // Permission denied or error — keep timezone fallback
      },
      { timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  return point;
}
