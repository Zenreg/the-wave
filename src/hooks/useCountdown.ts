import { useState, useEffect } from 'react';

interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  /** True when local time is within the 20:00:00–20:00:59 action window */
  isReady: boolean;
  /** True when local time is past the action window for today */
  isPast: boolean;
}

/** Compute seconds until 19:55 local (start of action window) */
export function getSecondsUntilWindow(): number {
  const now = new Date();
  const target = new Date(now);
  target.setHours(19, 55, 0, 0);

  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }

  return Math.floor((target.getTime() - now.getTime()) / 1000);
}

/** Check if current local time is within the ±5min action window (19:55–20:05) */
export function isWithinActionWindow(): boolean {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  // 19:55–19:59 or 20:00–20:05
  return (h === 19 && m >= 55) || (h === 20 && m <= 5);
}

/** Check if today's action window has already passed (after 20:05) */
export function isActionWindowPast(): boolean {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  return h === 20 ? m > 5 : h > 20;
}

export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(() => computeState());

  useEffect(() => {
    const interval = setInterval(() => {
      setState(computeState());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return state;
}

function computeState(): CountdownState {
  const isReady = isWithinActionWindow();
  const isPast = isActionWindowPast();
  const totalSeconds = isReady ? 0 : getSecondsUntilWindow();

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isReady,
    isPast,
  };
}
