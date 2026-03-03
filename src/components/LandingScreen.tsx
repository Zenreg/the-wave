import { useState } from 'react';
import { useLocale } from '../i18n';
import { useTimezoneWave } from '../hooks/useTimezoneWave';
import WorldMap from './WorldMap';

const SHARE_URL = 'https://jointhewave.fr';

interface LandingScreenProps {
  onEnter: () => void;
  userLng?: number;
}

export default function LandingScreen({ onEnter, userLng }: LandingScreenProps) {
  const { t } = useLocale();
  const { waveCenterLng } = useTimezoneWave(userLng);
  const [copied, setCopied] = useState(false);

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

      {/* La carte : le coeur de l'app */}
      <div className="w-full flex-1 flex items-center px-2">
        <div className="w-full">
          <WorldMap waveCenterLng={waveCenterLng} />
        </div>
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
        <button
          onClick={handleShare}
          className="px-4 py-1.5 rounded-full border border-indigo-500/20 text-xs text-indigo-300/70 font-light hover:bg-indigo-500/10 transition-colors"
        >
          {copied ? t('result.linkCopied') : t('result.share')}
        </button>
      </div>
    </div>
  );
}
