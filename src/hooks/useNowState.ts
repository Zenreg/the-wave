import { useState, useCallback } from 'react';
import type { AppScreen } from '../types';
import { STORAGE_KEYS } from '../types';
import { isWithinActionWindow, isActionWindowPast } from './useCountdown';

function getInitialScreen(): AppScreen {
  const hasEntered = localStorage.getItem(STORAGE_KEYS.HAS_ENTERED) === '1';

  if (!hasEntered) return 'landing';

  // Before 20h → always countdown (never show result early)
  if (!isWithinActionWindow() && !isActionWindowPast()) return 'countdown';

  // During the 20:00 window → check if already participated
  if (isWithinActionWindow()) {
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const hasParticipated = localStorage.getItem(STORAGE_KEYS.PARTICIPATED_PREFIX + todayKey) === '1';
    return hasParticipated ? 'result' : 'action';
  }

  // After 20:01 → result
  return 'result';
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
