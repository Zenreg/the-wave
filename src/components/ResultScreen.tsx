import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useWaveNarrative } from '../hooks/useWaveNarrative';
import { useLocale } from '../i18n';
import { useShare } from '../hooks/useShare';
import { useCalendarReminder } from '../hooks/useCalendarReminder';
import type { GeoPoint } from '../types';
import type { useParticipation } from '../hooks/useParticipation';
import ParticipantCounter from './ParticipantCounter';
import WorldMap from './WorldMap';
import BreathingOrb from './BreathingOrb';

interface ResultScreenProps {
  participation: ReturnType<typeof useParticipation>;
  myPoint?: GeoPoint;
}

export default function ResultScreen({ participation, myPoint }: ResultScreenProps) {
  const { totalCount, myTzCount, dots } = participation;
  const { bands, waveCenterLng } = useTimezoneWave(myPoint?.lng);
  const narrative = useWaveNarrative(bands);
  const { t, formatNumber } = useLocale();
  const { handleShare, copied } = useShare();
  const { download: downloadCalendar } = useCalendarReminder();

  return (
    <div className="screen screen-enter flex-col justify-between py-6 sm:py-10">
      <BreathingOrb size="lg" color="amber" />

      {/* Compteur + infos en haut */}
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

      {/* La carte + bouton partager */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-2">
        <div className="w-full max-w-3xl mx-auto">
          <WorldMap waveCenterLng={waveCenterLng} dots={dots} myPoint={myPoint} />
        </div>
        <button
          onClick={handleShare}
          className="mt-3 px-6 py-2 rounded-full border border-amber-400/50 text-sm text-amber-200/80 font-light tracking-wide hover:bg-amber-500/15 hover:border-amber-400/70 transition-all"
        >
          {copied ? t('result.linkCopied') : t('result.share')}
        </button>
      </div>

      {/* Narrative + rappel en bas */}
      <div className="relative z-10 text-center">
        <p className="text-sm text-amber-200/70 font-light">
          {narrative.headline}
        </p>

        <div className="mt-3">
          <button
            onClick={downloadCalendar}
            className="px-5 py-2 rounded-full border border-amber-500/30 text-xs text-amber-300/80 font-light tracking-wide hover:bg-amber-500/10 transition-colors"
          >
            {t('result.addToCalendar')}
          </button>
        </div>

        <p className="text-xs text-slate-600 font-light mt-2">
          {t('result.comeBack')}
        </p>
      </div>
    </div>
  );
}
