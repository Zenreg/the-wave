import { useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useLocale } from '../i18n';
import { useShare } from '../hooks/useShare';
import type { useParticipation } from '../hooks/useParticipation';
import BreathingOrb from './BreathingOrb';
import WorldMap from './WorldMap';

/** La vague démarre chaque jour à 19h30 UTC+14 (= 05h30 UTC) */
function getWaveElapsed(): { started: boolean; hours: number; minutes: number } {
  const now = new Date();
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const nowMinutes = utcH * 60 + utcM;
  const startMinutes = 5 * 60 + 30; // 05h30 UTC = 19h30 UTC+14

  if (nowMinutes < startMinutes) {
    return { started: false, hours: 0, minutes: 0 };
  }

  const elapsed = nowMinutes - startMinutes;
  return {
    started: true,
    hours: Math.floor(elapsed / 60),
    minutes: elapsed % 60,
  };
}

interface CountdownScreenProps {
  actionText?: string;
  onReady: () => void;
  participation: ReturnType<typeof useParticipation>;
  userLng?: number;
}

export default function CountdownScreen({ actionText, onReady, participation, userLng }: CountdownScreenProps) {
  const { hours, minutes, seconds, isReady } = useCountdown();
  const { waveCenterLng } = useTimezoneWave(userLng);
  const { t } = useLocale();
  const { totalCount, yesterdayCount, dots } = participation;
  const { handleShare, copied } = useShare();
  const waveElapsed = getWaveElapsed();

  useEffect(() => {
    if (isReady) onReady();
  }, [isReady, onReady]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="screen screen-enter flex-col justify-between py-6 sm:py-10">
      <BreathingOrb size="md" color="indigo" />

      {/* Timer + action en haut */}
      <div className="relative z-10 text-center pt-6">
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

      {/* La carte */}
      <div className="relative z-10 w-full flex-1 flex items-center px-2">
        <div className="w-full max-w-3xl mx-auto">
          <WorldMap waveCenterLng={waveCenterLng} dots={dots} />
        </div>
      </div>

      {/* Infos vague + compteur + partager en bas */}
      <div className="relative z-10 text-center pb-2">
        <p className="text-sm text-amber-200/80 font-light">
          {t('countdown.localTime')}
        </p>
        <p className="text-xs text-amber-200/50 font-light">
          {waveElapsed.started
            ? t('countdown.waveStarted', { hours: String(waveElapsed.hours), minutes: pad(waveElapsed.minutes) })
            : t('countdown.waveNotStarted')
          }
        </p>

        <p className="text-sm text-amber-300/80 font-light mt-2">
          {totalCount > 0
            ? `${totalCount} ${t('result.participantLabel')}`
            : yesterdayCount > 0
              ? t('countdown.yesterday', { count: yesterdayCount })
              : t('countdown.beFirst')
          }
        </p>

        <button
          onClick={handleShare}
          className="mt-2 px-6 py-2 rounded-full border border-amber-400/50 text-sm text-amber-200/80 font-light tracking-wide hover:bg-amber-500/15 hover:border-amber-400/70 transition-all"
        >
          {copied ? t('result.linkCopied') : t('result.share')}
        </button>
      </div>
    </div>
  );
}
