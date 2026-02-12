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

const IS_DEV = import.meta.env.DEV;

function AppInner() {
  const { locale, t } = useLocale();
  const { screen, goToScreen } = useNowState();
  const { action } = useDailyAction(locale);
  const participation = useParticipation();
  const geoPoint = useGeolocation();

  return (
    <>
      {screen === 'landing' && (
        <LandingScreen onEnter={() => goToScreen('countdown')} />
      )}

      {screen === 'countdown' && (
        <CountdownScreen
          actionText={action?.actionText}
          onReady={() => goToScreen('action')}
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

      <LocaleToggle />

      {IS_DEV && (
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
