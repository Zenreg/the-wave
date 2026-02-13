import type { Locale } from '../i18n/types';
import fallbackActionsFr from '../i18n/fallbackActions.fr';
import fallbackActionsEn from '../i18n/fallbackActions.en';

const fallbacksByLocale: Record<Locale, readonly string[]> = {
  fr: fallbackActionsFr,
  en: fallbackActionsEn,
};

export function getFallbackAction(locale: Locale = 'fr'): string {
  const actions = fallbacksByLocale[locale];
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return actions[(dayOfYear - 1) % actions.length];
}
