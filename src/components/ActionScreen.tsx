import { useEffect, useRef } from 'react';
import { useActionTimer } from '../hooks/useActionTimer';
import { useLocale } from '../i18n';
import type { GeoPoint } from '../types';
import type { useParticipation } from '../hooks/useParticipation';
import CircularTimer from './CircularTimer';
import BreathingOrb from './BreathingOrb';

interface ActionScreenProps {
  actionText: string;
  onComplete: () => void;
  debug?: boolean;
  participation: ReturnType<typeof useParticipation>;
  geoPoint: GeoPoint;
}

export default function ActionScreen({ actionText, onComplete, debug = false, participation, geoPoint }: ActionScreenProps) {
  const { secondsLeft, isRunning, hasFinished, start } = useActionTimer(debug);
  const { submit, hasParticipatedToday } = participation;
  const { t } = useLocale();

  useEffect(() => {
    if (hasParticipatedToday && !debug) onComplete();
  }, [hasParticipatedToday, debug, onComplete]);

  const hasSubmittedRef = useRef(false);
  useEffect(() => {
    if (hasFinished && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      submit(geoPoint).then(onComplete);
    }
  }, [hasFinished, submit, onComplete, geoPoint]);

  const timerTotal = debug ? 5 : 30;

  return (
    <div className="screen screen-enter">
      <BreathingOrb size="lg" color={isRunning ? 'amber' : 'indigo'} />

      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        {!isRunning && !hasFinished && (
          <>
            <p className="text-2xl sm:text-3xl font-light text-white max-w-md leading-relaxed">
              {actionText}
            </p>

            <p className="text-sm text-slate-500 font-light">
              {debug ? t('action.durationDebug') : t('action.duration')}
            </p>

            <button
              onClick={start}
              className="mt-4 px-12 py-5 rounded-full bg-indigo-500/20 border border-indigo-400/30
                         text-indigo-200 text-xl font-light tracking-wider
                         hover:bg-indigo-500/30 hover:border-indigo-400/50
                         transition-all duration-500
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
              autoFocus
            >
              {t('action.cta')}
            </button>
          </>
        )}

        {isRunning && (
          <>
            <p className="text-xl sm:text-2xl font-light text-amber-200/80 max-w-sm leading-relaxed">
              {actionText}
            </p>

            <CircularTimer secondsLeft={secondsLeft} totalSeconds={timerTotal} />
          </>
        )}
      </div>
    </div>
  );
}
