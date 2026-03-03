import { useState, useEffect, useCallback, useRef } from 'react';

interface ActionTimerState {
  secondsLeft: number;
  isRunning: boolean;
  hasFinished: boolean;
  start: () => void;
}

const DURATION = 30;

export function useActionTimer(): ActionTimerState {
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (isRunning || hasFinished) return;
    setIsRunning(true);
    setSecondsLeft(DURATION);
  }, [isRunning, hasFinished]);

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
