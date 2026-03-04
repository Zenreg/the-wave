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

/** Compute seconds until 19:30 local (start of action window — la vague arrive) */
export function getSecondsUntilWindow(): number {
  const now = new Date();
  const target = new Date(now);
  target.setHours(19, 30, 0, 0);

  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }

  return Math.floor((target.getTime() - now.getTime()) / 1000);
}

/** Check if current local time is within the 1h action window (19:30–20:30) */
export function isWithinActionWindow(): boolean {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  return (h === 19 && m >= 30) || (h === 20 && m <= 30);
}

/** Check if today's action window has already passed (after 20:30) */
export function isActionWindowPast(): boolean {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  return h === 20 ? m > 30 : h > 20;
}

export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(() => computeState());

  useEffect(() => {
    const tick = () => setState(computeState());
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') tick();
    }, 1000);
    // Recalculer immédiatement quand l'onglet redevient visible
    const onVisible = () => { if (document.visibilityState === 'visible') tick(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
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
