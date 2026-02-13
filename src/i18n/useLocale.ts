import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import type { Locale } from './types';
import { createT } from './t';
import type { GeoPoint } from '../types';

const SUPPORTED_LOCALES: Locale[] = ['fr', 'en'];
const STORAGE_KEY = 'wave_locale';

function detectFromBrowser(): Locale | null {
  const lang = navigator.language?.toLowerCase().split('-')[0];
  if (lang && SUPPORTED_LOCALES.includes(lang as Locale)) return lang as Locale;
  return null;
}

function detectFromGeo(point: GeoPoint): Locale {
  const { lat, lng } = point;

  // France métropolitaine
  if (lat >= 41 && lat <= 51.5 && lng >= -5.5 && lng <= 10) return 'fr';
  // Belgique francophone
  if (lat >= 49.5 && lat <= 51 && lng >= 2.5 && lng <= 6.5) return 'fr';
  // Suisse romande
  if (lat >= 46 && lat <= 48 && lng >= 5.5 && lng <= 7.5) return 'fr';
  // DOM-TOM : Réunion, Mayotte
  if (lat >= -22 && lat <= -11 && lng >= 43 && lng <= 56) return 'fr';
  // Polynésie française
  if (lat >= -28 && lat <= -7 && lng >= -155 && lng <= -130) return 'fr';
  // Nouvelle-Calédonie
  if (lat >= -23 && lat <= -19 && lng >= 163 && lng <= 169) return 'fr';
  // Guadeloupe, Martinique, Guyane
  if (lat >= 2 && lat <= 17 && lng >= -65 && lng <= -52) return 'fr';
  // Afrique francophone (Ouest/Centre)
  if (lat >= -5 && lat <= 25 && lng >= -18 && lng <= 30) return 'fr';

  return 'en';
}

function detectLocale(geoPoint: GeoPoint | null): Locale {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;

  const fromBrowser = detectFromBrowser();
  if (fromBrowser) return fromBrowser;

  if (geoPoint) return detectFromGeo(geoPoint);

  return 'en';
}

function formatNumberForLocale(locale: Locale): (n: number) => string {
  const intlLocale = locale === 'fr' ? 'fr-FR' : 'en-US';
  const formatter = new Intl.NumberFormat(intlLocale);
  return (n: number) => formatter.format(n);
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ReturnType<typeof createT>;
  formatNumber: (n: number) => string;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleDetection(geoPoint: GeoPoint | null) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale(geoPoint));

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLocaleState(l);
  }, []);

  const t = createT(locale);
  const formatNumber = formatNumberForLocale(locale);

  return { locale, setLocale, t, formatNumber };
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
