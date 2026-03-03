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
  actionText?: string;
  participation: ReturnType<typeof useParticipation>;
  myPoint?: GeoPoint;
}

const SHARE_URL = 'https://wave.30jourspourchanger.com';

export default function ResultScreen({ actionText, participation, myPoint }: ResultScreenProps) {
  const { totalCount, myTzCount, yesterdayCount, dots } = participation;
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
    <div className="screen screen-enter overflow-y-auto">
      <BreathingOrb size="lg" color="amber" />

      <div className="relative z-10 flex flex-col items-center gap-8 py-12 w-full max-w-3xl">
        {actionText && (
          <p className="text-lg text-slate-400 font-light italic text-center">
            "{actionText}"
          </p>
        )}

        <ParticipantCounter
          targetCount={totalCount}
          label={t('result.participantLabel')}
        />

        {totalCount <= 50 && (
          <p className="text-sm text-amber-300/70 font-light tracking-wide">
            {t('result.pioneerLabel')}
          </p>
        )}

        {myTzCount > 0 && (
          <p className="text-sm text-indigo-300/60 font-light">
            {t('result.nearYou', { count: formatNumber(myTzCount) })}
          </p>
        )}

        {yesterdayCount > 0 && (
          <p className="text-sm text-slate-500 font-light">
            {t('result.yesterday', { count: formatNumber(yesterdayCount) })}
          </p>
        )}

        {/* Wave narrative */}
        <div className="text-center mt-2">
          <p className="text-base text-amber-200/70 font-light">
            {narrative.headline}
          </p>
          <p className="text-sm text-slate-400/60 font-light mt-1 max-w-md">
            {narrative.detail}
          </p>
        </div>

        <div className="w-full mt-4">
          <WorldMap waveCenterLng={waveCenterLng} dots={dots} myPoint={myPoint} />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <button
            onClick={handleShare}
            className="px-6 py-2.5 rounded-full border border-indigo-500/30 text-sm text-indigo-300 font-light tracking-wide hover:bg-indigo-500/10 transition-colors"
          >
            {copied ? t('result.linkCopied') : t('result.share')}
          </button>

          {pushStatus !== 'unavailable' && (
            <button
              onClick={handleReminder}
              disabled={pushStatus === 'subscribed'}
              className="px-6 py-2.5 rounded-full border border-amber-500/30 text-sm text-amber-300/80 font-light tracking-wide hover:bg-amber-500/10 transition-colors disabled:opacity-50"
            >
              {pushStatus === 'subscribed' ? t('result.reminderEnabled') : t('result.enableReminder')}
            </button>
          )}
        </div>

        <p className="text-sm text-slate-600 font-light mt-4">
          {t('result.comeBack')}
        </p>
      </div>
    </div>
  );
}
