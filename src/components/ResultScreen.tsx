import { useState, useEffect } from 'react';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useWaveNarrative } from '../hooks/useWaveNarrative';
import { useLocale } from '../i18n';
import type { GeoPoint } from '../types';
import type { useParticipation } from '../hooks/useParticipation';
import { subscribeToPush, isPushSubscribed } from '../lib/pushSubscription';
import ParticipantCounter from './ParticipantCounter';
import WorldMap from './WorldMap';
import BreathingOrb from './BreathingOrb';

interface ResultScreenProps {
  participation: ReturnType<typeof useParticipation>;
  myPoint?: GeoPoint;
}

const SHARE_URL = 'https://wave.30jourspourchanger.com';

export default function ResultScreen({ participation, myPoint }: ResultScreenProps) {
  const { totalCount, myTzCount, dots } = participation;
  const { bands, waveCenterLng } = useTimezoneWave(myPoint?.lng);
  const narrative = useWaveNarrative(bands);
  const { t, formatNumber } = useLocale();
  const [copied, setCopied] = useState(false);
  const [pushStatus, setPushStatus] = useState<'idle' | 'subscribed' | 'unavailable'>('idle');

  useEffect(() => {
    isPushSubscribed().then(ok => {
      if (ok) setPushStatus('subscribed');
      else if (!('PushManager' in window)) setPushStatus('unavailable');
    });
  }, []);

  const handleReminder = async () => {
    const ok = await subscribeToPush();
    setPushStatus(ok ? 'subscribed' : 'idle');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'TheWave',
      text: t('result.shareText'),
      url: SHARE_URL,
    };
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
      <BreathingOrb size="lg" color="amber" />

      {/* Compteur + infos en haut, compact */}
      <div className="relative z-10 text-center">
        <ParticipantCounter
          targetCount={totalCount}
          label={t('result.participantLabel')}
        />
        {totalCount <= 50 && (
          <p className="text-xs text-amber-300/70 font-light tracking-wide mt-1">
            {t('result.pioneerLabel')}
          </p>
        )}
        {myTzCount > 0 && (
          <p className="text-xs text-indigo-300/50 font-light mt-1">
            {t('result.nearYou', { count: formatNumber(myTzCount) })}
          </p>
        )}
      </div>

      {/* La carte : occupe tout l'espace central */}
      <div className="relative z-10 w-full flex-1 flex items-center px-2">
        <div className="w-full max-w-3xl mx-auto">
          <WorldMap waveCenterLng={waveCenterLng} dots={dots} myPoint={myPoint} />
        </div>
      </div>

      {/* Narrative + boutons en bas, compact */}
      <div className="relative z-10 text-center">
        <p className="text-sm text-amber-200/70 font-light">
          {narrative.headline}
        </p>

        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            onClick={handleShare}
            className="px-5 py-2 rounded-full border border-indigo-500/30 text-xs text-indigo-300 font-light tracking-wide hover:bg-indigo-500/10 transition-colors"
          >
            {copied ? t('result.linkCopied') : t('result.share')}
          </button>

          {pushStatus !== 'unavailable' && (
            <button
              onClick={handleReminder}
              disabled={pushStatus === 'subscribed'}
              className="px-5 py-2 rounded-full border border-amber-500/30 text-xs text-amber-300/80 font-light tracking-wide hover:bg-amber-500/10 transition-colors disabled:opacity-50"
            >
              {pushStatus === 'subscribed' ? t('result.reminderEnabled') : t('result.enableReminder')}
            </button>
          )}
        </div>

        <p className="text-xs text-slate-600 font-light mt-2">
          {t('result.comeBack')}
        </p>
      </div>
    </div>
  );
}
