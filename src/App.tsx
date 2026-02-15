import { useNowState } from './hooks/useNowState';
import { useDailyAction } from './hooks/useDailyAction';
import { useParticipation } from './hooks/useParticipation';
import { useGeolocation } from './hooks/useGeolocation';
import { LocaleProvider, useLocale } from './i18n';
import LandingScreen from './components/LandingScreen';
import CountdownScreen from './components/CountdownScreen';
import ActionScreen from './components/ActionScreen';
import ResultScreen from './components/ResultScreen';
import DebugPanel from './components/DebugPanel';
import LocaleToggle from './components/LocaleToggle';
import AudioToggle from './components/AudioToggle';
import { useSignature } from './hooks/useSignature';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { verifyIntegrity } from './lib/integrity';
import fr from './i18n/fr';
import en from './i18n/en';
import narrativesFr from './i18n/narratives.fr';
import narrativesEn from './i18n/narratives.en';
import citiesFr from './i18n/cities.fr';
import citiesEn from './i18n/cities.en';
import fallbackActionsFr from './i18n/fallbackActions.fr';
import fallbackActionsEn from './i18n/fallbackActions.en';

const IS_DEV = import.meta.env.DEV;

// Integrity check on mount (production only)
verifyIntegrity([fr, en, narrativesFr, narrativesEn, citiesFr, citiesEn, fallbackActionsFr, fallbackActionsEn])
  .then(ok => { if (!ok) document.title = '⚠'; });

function AppInner() {
  const { locale, t } = useLocale();
  const { screen, goToScreen } = useNowState();
  const { action } = useDailyAction(locale);
  const participation = useParticipation();
  const geoPoint = useGeolocation();
  const sig = useSignature();
  const { muted, toggleMute } = useBackgroundMusic();

  return (
    <>
      {sig.visible && (
        <div className="fixed bottom-20 left-0 right-0 z-[999] flex justify-center pointer-events-none">
          <p className="text-xs text-white/30 font-light tracking-[0.2em] animate-pulse">
            {sig.text}
          </p>
        </div>
      )}

      {screen === 'landing' && (
        <LandingScreen onEnter={() => goToScreen('countdown')} />
      )}

      {screen === 'countdown' && (
        <CountdownScreen
          actionText={action?.actionText}
          onReady={() => goToScreen('action')}
          participation={participation}
        />
      )}

      {(screen === 'action' || screen === 'participating') && (
        <ActionScreen
          actionText={action?.actionText ?? t('action.fallback')}
          onComplete={() => goToScreen('result')}
          debug={IS_DEV}
          participation={participation}
          geoPoint={geoPoint}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          actionText={action?.actionText}
          participation={participation}
        />
      )}

      <LocaleToggle audioButton={<AudioToggle muted={muted} onToggle={toggleMute} />} />

      {(IS_DEV || sig.debug) && (
        <DebugPanel currentScreen={screen} onNavigate={goToScreen} />
      )}
    </>
  );
}

function App() {
  const geoPoint = useGeolocation();

  return (
    <LocaleProvider geoPoint={geoPoint}>
      <AppInner />
    </LocaleProvider>
  );
}

export default App;
