import { useState, useEffect, useCallback, useRef } from 'react';

interface ActionTimerState {
  secondsLeft: number;
  isRunning: boolean;
  hasFinished: boolean;
  start: () => void;
}

const DURATION = 60;
const DEBUG_DURATION = 5;

export function useActionTimer(debug = false): ActionTimerState {
  const duration = debug ? DEBUG_DURATION : DURATION;
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (isRunning || hasFinished) return;
    setIsRunning(true);
    setSecondsLeft(duration);
  }, [isRunning, hasFinished, duration]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRunning(false);
          setHasFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return { secondsLeft, isRunning, hasFinished, start };
}
