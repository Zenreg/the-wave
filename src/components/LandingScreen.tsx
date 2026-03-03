import { useLocale } from '../i18n';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import WorldMap from './WorldMap';

interface LandingScreenProps {
  onEnter: () => void;
  userLng?: number;
}

export default function LandingScreen({ onEnter, userLng }: LandingScreenProps) {
  const { t } = useLocale();
  const { waveCenterLng } = useTimezoneWave(userLng);

  return (
    <div className="screen screen-enter flex-col justify-between py-8 sm:py-12">
      {/* Titre minimal en haut */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extralight tracking-[0.3em] glow-text">
          TheWave
        </h1>
        <p className="text-sm text-indigo-200/50 font-light mt-1">
          {t('landing.tagline')}
        </p>
      </div>

      {/* La carte : le coeur de l'app */}
      <div className="w-full flex-1 flex items-center px-2">
        <div className="w-full">
          <WorldMap waveCenterLng={waveCenterLng} />
        </div>
      </div>

      {/* Bouton en bas */}
      <button
        onClick={onEnter}
        className="px-10 py-3 rounded-full border border-indigo-400/30 text-indigo-300
                   hover:bg-indigo-500/10 hover:border-indigo-400/50
                   transition-all duration-500 text-base font-light tracking-wider
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
        autoFocus
      >
        {t('landing.enter')}
      </button>
    </div>
  );
}
