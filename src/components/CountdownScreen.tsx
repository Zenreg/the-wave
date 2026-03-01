import { useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useWaveNarrative } from '../hooks/useWaveNarrative';
import { useLocale } from '../i18n';
import type { useParticipation } from '../hooks/useParticipation';
import { useSimulatedDots } from '../hooks/useSimulatedDots';
import BreathingOrb from './BreathingOrb';
import WorldMap from './WorldMap';

// Simulation toujours active pour le moment (on retirera après test)
const SIM_ENABLED = true;

interface CountdownScreenProps {
  actionText?: string;
  onReady: () => void;
  participation: ReturnType<typeof useParticipation>;
}

export default function CountdownScreen({ actionText, onReady, participation }: CountdownScreenProps) {
  const { hours, minutes, seconds, isReady } = useCountdown();
  const { bands, waveCenterLng } = useTimezoneWave();
  const narrative = useWaveNarrative(bands);
  const { t } = useLocale();
  const { totalCount, yesterdayCount, dots } = participation;
  const simDots = useSimulatedDots(SIM_ENABLED);
  const allDots = SIM_ENABLED ? [...dots, ...simDots] : dots;

  useEffect(() => {
    if (isReady) onReady();
  }, [isReady, onReady]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="screen screen-enter overflow-y-auto">
      <BreathingOrb size="md" color="indigo" />

      <div className="relative z-10 flex flex-col items-center gap-6 py-12 w-full max-w-3xl">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500 font-light">
          {t('countdown.nextMoment')}
        </p>

        <div className="text-6xl sm:text-8xl font-extralight tracking-widest text-white tabular-nums"
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
          <div className="max-w-md mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600 mb-3">
              {t('countdown.todayAction')}
            </p>
            <p className="text-lg text-slate-300 font-light leading-relaxed italic">
              "{actionText}"
            </p>
          </div>
        )}

        {/* Wave narrative + participant count */}
        <div className="text-center mt-2">
          {totalCount > 0 && (
            <p className="text-sm text-indigo-300/50 font-light mb-2">
              {totalCount} {t('result.participantLabel')}
            </p>
          )}
          {totalCount === 0 && yesterdayCount > 0 && (
            <p className="text-sm text-indigo-300/40 font-light mb-2">
              {t('countdown.yesterday', { count: yesterdayCount })}
            </p>
          )}
          <p className="text-base text-amber-200/70 font-light">
            {narrative.headline}
          </p>
          <p className="text-sm text-slate-400/60 font-light mt-1 max-w-md">
            {narrative.detail}
          </p>
        </div>

        {/* Live world map with wave */}
        <div className="w-full mt-2">
          <WorldMap waveCenterLng={waveCenterLng} dots={allDots} />
        </div>

        <p className="text-sm text-slate-600 font-light">
          {t('countdown.localTime')}
        </p>
      </div>
    </div>
  );
}
