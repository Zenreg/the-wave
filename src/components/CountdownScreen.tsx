import { useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useWaveNarrative } from '../hooks/useWaveNarrative';
import { useLocale } from '../i18n';
import { useShare } from '../hooks/useShare';
import type { useParticipation } from '../hooks/useParticipation';
import BreathingOrb from './BreathingOrb';
import WorldMap from './WorldMap';

interface CountdownScreenProps {
  actionText?: string;
  onReady: () => void;
  participation: ReturnType<typeof useParticipation>;
  userLng?: number;
}

export default function CountdownScreen({ actionText, onReady, participation, userLng }: CountdownScreenProps) {
  const { hours, minutes, seconds, isReady } = useCountdown();
  const { bands, waveCenterLng } = useTimezoneWave(userLng);
  const narrative = useWaveNarrative(bands);
  const { t } = useLocale();
  const { totalCount, yesterdayCount, dots } = participation;
  const { handleShare, copied } = useShare();

  useEffect(() => {
    if (isReady) onReady();
  }, [isReady, onReady]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="screen screen-enter flex-col justify-between py-6 sm:py-10">
      <BreathingOrb size="md" color="indigo" />

      {/* Timer + action en haut, compact */}
      <div className="relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-light mb-2">
          {t('countdown.nextMoment')}
        </p>

        <div className="text-5xl sm:text-7xl font-extralight tracking-widest text-white tabular-nums"
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
          <p className="text-sm text-slate-400 font-light italic mt-3">
            &ldquo;{actionText}&rdquo;
          </p>
        )}
      </div>

      {/* La carte + bouton partager */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-2">
        <div className="w-full max-w-3xl mx-auto">
          <WorldMap waveCenterLng={waveCenterLng} dots={dots} />
        </div>
        <button
          onClick={handleShare}
          className="mt-3 px-6 py-2 rounded-full border border-indigo-400/50 text-sm text-indigo-200 font-light tracking-wide hover:bg-indigo-500/15 hover:border-indigo-400/70 transition-all"
        >
          {copied ? t('result.linkCopied') : t('result.share')}
        </button>
      </div>

      {/* Compteur + narrative en bas */}
      <div className="relative z-10 text-center">
        {totalCount > 0 && (
          <p className="text-sm text-indigo-300/60 font-light mb-1">
            {totalCount} {t('result.participantLabel')}
          </p>
        )}
        {totalCount === 0 && yesterdayCount > 0 && (
          <p className="text-sm text-indigo-300/50 font-light mb-1">
            {t('countdown.yesterday', { count: yesterdayCount })}
          </p>
        )}
        {totalCount === 0 && yesterdayCount === 0 && (
          <p className="text-sm text-indigo-300/40 font-light mb-1">
            {t('countdown.beFirst')}
          </p>
        )}
        <p className="text-sm text-amber-200/70 font-light">
          {narrative.headline}
        </p>
        <p className="text-xs text-slate-600 font-light mt-1">
          {t('countdown.localTime')}
        </p>
      </div>
    </div>
  );
}
