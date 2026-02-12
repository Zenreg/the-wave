import { useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useLocale } from '../i18n';
import BreathingOrb from './BreathingOrb';

interface CountdownScreenProps {
  actionText?: string;
  onReady: () => void;
}

export default function CountdownScreen({ actionText, onReady }: CountdownScreenProps) {
  const { hours, minutes, seconds, isReady } = useCountdown();
  const { t } = useLocale();

  useEffect(() => {
    if (isReady) onReady();
  }, [isReady, onReady]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="screen screen-enter">
      <BreathingOrb size="md" color="indigo" />

      <div className="relative z-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-6 font-light">
          {t('countdown.nextMoment')}
        </p>

        <div className="text-6xl sm:text-8xl font-extralight tracking-widest text-white mb-12 tabular-nums"
             aria-label={t('countdown.timerAria', { hours, minutes, seconds })}
             role="timer"
        >
          <span>{pad(hours)}</span>
          <span className="text-indigo-400/60 mx-1">:</span>
          <span>{pad(minutes)}</span>
          <span className="text-indigo-400/60 mx-1">:</span>
          <span>{pad(seconds)}</span>
        </div>

        {actionText && (
          <div className="max-w-md mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600 mb-3">
              {t('countdown.todayAction')}
            </p>
            <p className="text-lg text-slate-300 font-light leading-relaxed italic">
              "{actionText}"
            </p>
          </div>
        )}

        <p className="mt-12 text-sm text-slate-600 font-light">
          {t('countdown.localTime')}
        </p>
      </div>
    </div>
  );
}
