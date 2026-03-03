import { useLocale } from '../i18n';
import BreathingOrb from './BreathingOrb';

interface LandingScreenProps {
  onEnter: () => void;
}

export default function LandingScreen({ onEnter }: LandingScreenProps) {
  const { t } = useLocale();

  return (
    <div className="screen screen-enter">
      <BreathingOrb size="lg" color="indigo" />

      <div className="relative z-10 text-center max-w-lg">
        <h1 className="text-7xl sm:text-8xl font-extralight tracking-[0.3em] glow-text mb-8">
          THE WAVE
        </h1>

        <p className="text-xl sm:text-2xl text-indigo-200/80 leading-relaxed mb-8 font-light">
          {t('landing.tagline')}
        </p>

        <div className="space-y-3 mb-12">
          <p className="text-base text-slate-400 leading-relaxed font-light">
            {t('landing.concept1')}
          </p>
          <p className="text-base text-slate-400 leading-relaxed font-light">
            {t('landing.concept2')}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed font-light italic">
            {t('landing.concept3')}
          </p>
        </div>

        <button
          onClick={onEnter}
          className="px-10 py-4 rounded-full border border-indigo-400/30 text-indigo-300
                     hover:bg-indigo-500/10 hover:border-indigo-400/50
                     transition-all duration-500 text-lg font-light tracking-wider
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
          autoFocus
        >
          {t('landing.enter')}
        </button>
      </div>
    </div>
  );
}
