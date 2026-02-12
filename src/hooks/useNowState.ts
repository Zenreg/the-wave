import { useState, useCallback } from 'react';
import type { AppScreen } from '../types';
import { STORAGE_KEYS } from '../types';
import { isWithinActionWindow, isActionWindowPast } from './useCountdown';

function getInitialScreen(): AppScreen {
  const hasEntered = localStorage.getItem(STORAGE_KEYS.HAS_ENTERED) === '1';

  if (!hasEntered) return 'landing';

  // Check if already participated today
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const hasParticipated = localStorage.getItem(STORAGE_KEYS.PARTICIPATED_PREFIX + todayKey) === '1';

  if (hasParticipated) return 'result';
  if (isWithinActionWindow()) return 'action';
  if (isActionWindowPast()) return 'result';

  return 'countdown';
}

export function useNowState() {
  const [screen, setScreen] = useState<AppScreen>(getInitialScreen);

  const goToScreen = useCallback((next: AppScreen) => {
    if (next === 'countdown' || next === 'action') {
      localStorage.setItem(STORAGE_KEYS.HAS_ENTERED, '1');
    }
    setScreen(next);
  }, []);

  return { screen, goToScreen };
}
