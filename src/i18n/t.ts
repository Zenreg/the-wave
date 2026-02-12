import type { Locale, TranslationKeys } from './types';
import fr from './fr';
import en from './en';

const translations: Record<Locale, TranslationKeys> = { fr, en };

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  );
}

export function createT(locale: Locale) {
  const strings = translations[locale];

  return function t(key: keyof TranslationKeys, vars?: Record<string, string | number>): string {
    const raw = strings[key];
    return vars ? interpolate(raw, vars) : raw;
  };
}
