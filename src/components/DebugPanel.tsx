import { useEffect } from 'react';
import { useLocale } from '../i18n';
import type { AppScreen } from '../types';

const SCREENS: AppScreen[] = ['landing', 'countdown', 'action', 'participating', 'result'];

interface DebugPanelProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export default function DebugPanel({ currentScreen, onNavigate }: DebugPanelProps) {
  const { t } = useLocale();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < SCREENS.length) {
        onNavigate(SCREENS[idx]);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNavigate]);

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-slate-900/90 border border-slate-700 rounded-lg p-3 text-xs backdrop-blur">
      <p className="text-slate-500 mb-2 font-mono">DEBUG (dev only)</p>
      <div className="flex gap-1.5 flex-wrap">
        {SCREENS.map((s, i) => (
          <button
            key={s}
            onClick={() => onNavigate(s)}
            className={`px-2 py-1 rounded font-mono transition-colors ${
              currentScreen === s
                ? 'bg-indigo-500/40 text-indigo-200 border border-indigo-400/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {i + 1}:{s}
          </button>
        ))}
      </div>
      <p className="text-slate-600 mt-2">{t('debug.keyboardHint')}</p>
    </div>
  );
}
