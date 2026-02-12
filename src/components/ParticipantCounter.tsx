import { useEffect, useState, useRef } from 'react';
import { useLocale } from '../i18n';

interface ParticipantCounterProps {
  targetCount: number;
  label: string;
}

export default function ParticipantCounter({ targetCount, label }: ParticipantCounterProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const prevTarget = useRef(0);
  const rafRef = useRef<number | null>(null);
  const { formatNumber } = useLocale();

  useEffect(() => {
    const startCount = prevTarget.current;
    prevTarget.current = targetCount;
    const delta = targetCount - startCount;
    if (delta <= 0) {
      rafRef.current = requestAnimationFrame(() => setDisplayCount(targetCount));
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }

    const duration = Math.min(2000, delta * 50);
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.floor(startCount + eased * delta));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetCount]);

  return (
    <div className="text-center animate-fade-in">
      <p className="text-5xl sm:text-6xl font-extralight tabular-nums glow-text-amber text-amber-200">
        {formatNumber(displayCount)}
      </p>
      <p className="mt-3 text-sm text-slate-400 font-light tracking-wide">
        {label}
      </p>
    </div>
  );
}
