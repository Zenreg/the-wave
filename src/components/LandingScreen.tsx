import { useLocale } from '../i18n';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import { useShare } from '../hooks/useShare';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import WorldMap from './WorldMap';

interface LandingScreenProps {
  onEnter: () => void;
  userLng?: number;
}

export default function LandingScreen({ onEnter, userLng }: LandingScreenProps) {
  const { t } = useLocale();
  const { waveCenterLng } = useTimezoneWave(userLng);
  const { handleShare, copied } = useShare();
  const { canPrompt, isIOS, isInstalled, install } = useInstallPrompt();

  return (
    <div className="screen screen-enter flex-col justify-between py-8 sm:py-12">
      {/* Titre + philosophie en haut */}
      <div className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extralight tracking-[0.3em] glow-text">
          TheWave
        </h1>
        <p className="text-sm text-indigo-200/50 font-light mt-1 mb-3">
          {t('landing.tagline')}
        </p>
        <p className="text-xs text-slate-400/80 font-light leading-relaxed">
          {t('landing.concept1')}
        </p>
        <p className="text-xs text-slate-400/80 font-light leading-relaxed">
          {t('landing.concept2')}
        </p>
        <p className="text-xs text-slate-500/60 font-light italic leading-relaxed mt-1">
          {t('landing.concept3')}
        </p>
      </div>

      {/* La carte + bouton partager */}
      <div className="w-full flex-1 flex flex-col items-center justify-center px-2">
        <div className="w-full">
          <WorldMap waveCenterLng={waveCenterLng} />
        </div>
        <button
          onClick={handleShare}
          className="mt-3 px-6 py-2 rounded-full border border-amber-400/50 text-sm text-amber-200/80 font-light tracking-wide hover:bg-amber-500/15 hover:border-amber-400/70 transition-all"
        >
          {copied ? t('result.linkCopied') : t('result.share')}
        </button>
      </div>

      {/* Boutons en bas */}
      <div className="flex flex-col items-center gap-3">
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

        {!isInstalled && canPrompt && (
          <button
            onClick={install}
            className="text-xs text-slate-400/70 font-light hover:text-slate-300 transition-colors"
          >
            {t('landing.install')}
          </button>
        )}
        {!isInstalled && isIOS && !canPrompt && (
          <p className="text-xs text-slate-500/50 font-light text-center px-6">
            {t('landing.installIOS')}
          </p>
        )}
      </div>
    </div>
  );
}
