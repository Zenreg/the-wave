import { useEffect, useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useWaveNarrative } from '../hooks/useWaveNarrative';
import { useLocale } from '../i18n';
import type { GeoPoint } from '../types';
import type { useParticipation } from '../hooks/useParticipation';
import BreathingOrb from './BreathingOrb';
import WorldMap from './WorldMap';

const SHARE_URL = 'https://jointhewave.fr';

interface CountdownScreenProps {
  actionText?: string;
  onReady: () => void;
  participation: ReturnType<typeof useParticipation>;
  userLng?: number;
  myPoint?: GeoPoint;
}

export default function CountdownScreen({ actionText, onReady, participation, userLng, myPoint }: CountdownScreenProps) {
  const { hours, minutes, seconds, isReady } = useCountdown();
  const { bands, waveCenterLng } = useTimezoneWave(userLng);
  const narrative = useWaveNarrative(bands);
  const { t } = useLocale();
  const { totalCount, yesterdayCount, dots } = participation;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isReady) onReady();
  }, [isReady, onReady]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const handleShare = async () => {
    const shareData = { title: 'TheWave', text: t('result.shareText'), url: SHARE_URL };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* annulé */ }
    } else {
      await navigator.clipboard.writeText(`${t('result.shareText')} ${SHARE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            "{actionText}"
          </p>
        )}
      </div>

      {/* La carte : occupe tout l'espace central */}
      <div className="relative z-10 w-full flex-1 flex items-center px-2">
        <div className="w-full max-w-3xl mx-auto">
          <WorldMap waveCenterLng={waveCenterLng} dots={dots} myPoint={myPoint} />
        </div>
      </div>

      {/* Compteur + narrative + partage en bas */}
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
        <p className="text-sm text-amber-200/70 font-light">
          {narrative.headline}
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <p className="text-xs text-slate-600 font-light">
            {t('countdown.localTime')}
          </p>
          <button
            onClick={handleShare}
            className="px-4 py-1.5 rounded-full border border-indigo-500/20 text-xs text-indigo-300/70 font-light hover:bg-indigo-500/10 transition-colors"
          >
            {copied ? t('result.linkCopied') : t('result.share')}
          </button>
        </div>
      </div>
    </div>
  );
}
