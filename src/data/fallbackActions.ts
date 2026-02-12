import type { Locale } from '../i18n/types';
import fallbackActionsFr from '../i18n/fallbackActions.fr';
import fallbackActionsEn from '../i18n/fallbackActions.en';

const fallbacksByLocale: Record<Locale, string[]> = {
  fr: fallbackActionsFr,
  en: fallbackActionsEn,
};

export function getFallbackAction(locale: Locale = 'fr'): string {
  const actions = fallbacksByLocale[locale];
  const dayOfMonth = new Date().getDate();
  return actions[(dayOfMonth - 1) % actions.length];
}
