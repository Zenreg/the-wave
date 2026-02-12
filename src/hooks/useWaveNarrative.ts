import { useMemo } from 'react';
import { useLocale } from '../i18n';
import type { TimezoneBand } from '../types';
import type { NarrativeTemplates, CityNames } from '../i18n/types';
import narrativesFr from '../i18n/narratives.fr';
import narrativesEn from '../i18n/narratives.en';
import citiesFr from '../i18n/cities.fr';
import citiesEn from '../i18n/cities.en';

interface WaveNarrative {
  headline: string;
  detail: string;
}

function getCityForOffset(offset: number, cities: CityNames): string {
  const list = cities[String(offset)];
  if (!list || list.length === 0) return '';
  return list[Math.floor(Math.random() * list.length)];
}

function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? vars[key] : `{${key}}`
  );
}

export function computeNarrative(
  bands: TimezoneBand[],
  templates: NarrativeTemplates,
  cities: CityNames,
): WaveNarrative {
  const doneBands = bands.filter(b => b.state === 'done');
  const activeBands = bands.filter(b => b.state === 'active');
  const futureBands = bands.filter(b => b.state === 'future');

  const doneCount = doneBands.length;
  const totalCount = bands.length;
  const progress = doneCount / totalCount;

  const activeCity = activeBands.length > 0 ? getCityForOffset(activeBands[0].offset, cities) : '';
  const nextCity = futureBands.length > 0 ? getCityForOffset(futureBands[0].offset, cities) : '';
  const lastDoneCity = doneBands.length > 0 ? getCityForOffset(doneBands[doneBands.length - 1].offset, cities) : '';

  if (progress < 0.1) {
    return {
      headline: templates.waveJustStarted.headline,
      detail: activeCity
        ? interpolate(templates.waveJustStarted.detailWithCity, { city: activeCity })
        : templates.waveJustStarted.detailFallback,
    };
  }

  if (progress < 0.3) {
    return {
      headline: templates.waveAsia.headline,
      detail: lastDoneCity && activeCity
        ? interpolate(templates.waveAsia.detailWithCities, { lastCity: lastDoneCity, activeCity })
        : templates.waveAsia.detailFallback,
    };
  }

  if (progress < 0.5) {
    const nextPart = nextCity ? interpolate(templates.waveHalf.soon, { city: nextCity }) : '';
    return {
      headline: templates.waveHalf.headline,
      detail: activeCity
        ? interpolate(templates.waveHalf.detailWithCity, { city: activeCity, next: nextPart })
        : templates.waveHalf.detailFallback,
    };
  }

  if (progress < 0.7) {
    return {
      headline: templates.waveEuropeAfrica.headline,
      detail: activeCity
        ? interpolate(templates.waveEuropeAfrica.detailWithCity, { city: activeCity })
        : templates.waveEuropeAfrica.detailFallback,
    };
  }

  if (progress < 0.9) {
    return {
      headline: templates.waveAmericas.headline,
      detail: activeCity
        ? interpolate(templates.waveAmericas.detailWithCity, { city: activeCity })
        : templates.waveAmericas.detailFallback,
    };
  }

  return {
    headline: templates.waveComplete.headline,
    detail: templates.waveComplete.detail,
  };
}

export function useWaveNarrative(bands: TimezoneBand[]) {
  const { locale } = useLocale();

  const templates = locale === 'fr' ? narrativesFr : narrativesEn;
  const cities = locale === 'fr' ? citiesFr : citiesEn;

  const narrative = useMemo(
    () => computeNarrative(bands, templates, cities),
    [bands, templates, cities],
  );

  return narrative;
}
