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

/** Compute seconds until next 20:00 local */
export function getSecondsUntilNext8PM(): number {
  const now = new Date();
  const target = new Date(now);
  target.setHours(20, 0, 0, 0);

  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }

  return Math.floor((target.getTime() - now.getTime()) / 1000);
}

/** Check if current local time is within the 60-second action window */
export function isWithinActionWindow(): boolean {
  const now = new Date();
  return now.getHours() === 20 && now.getMinutes() === 0;
}

/** Check if today's action window has already passed */
export function isActionWindowPast(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  return hour === 20 ? minute > 0 : hour > 20;
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
  const totalSeconds = isReady ? 0 : getSecondsUntilNext8PM();

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isReady,
    isPast,
  };
}
