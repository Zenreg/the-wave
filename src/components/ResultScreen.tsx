import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useWaveNarrative } from '../hooks/useWaveNarrative';
import { useLocale } from '../i18n';
import type { GeoPoint } from '../types';
import type { useParticipation } from '../hooks/useParticipation';
import { useSimulatedDots } from '../hooks/useSimulatedDots';
import ParticipantCounter from './ParticipantCounter';
import WorldMap from './WorldMap';
import BreathingOrb from './BreathingOrb';

const SIM_ENABLED = true;

interface ResultScreenProps {
  actionText?: string;
  participation: ReturnType<typeof useParticipation>;
  myPoint?: GeoPoint;
}

export default function ResultScreen({ actionText, participation, myPoint }: ResultScreenProps) {
  const { totalCount, myTzCount, yesterdayCount, dots } = participation;
  const { bands, waveCenterLng } = useTimezoneWave(myPoint?.lng);
  const narrative = useWaveNarrative(bands);
  const { t, formatNumber } = useLocale();
  const simDots = useSimulatedDots(SIM_ENABLED);
  const allDots = SIM_ENABLED ? [...dots, ...simDots] : dots;

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
          <WorldMap waveCenterLng={waveCenterLng} dots={allDots} myPoint={myPoint} />
        </div>

        <p className="text-sm text-slate-600 font-light mt-4">
          {t('result.comeBack')}
        </p>
      </div>
    </div>
  );
}
