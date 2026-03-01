import { describe, it, expect } from 'vitest';
import { computeNarrative } from '../hooks/useWaveNarrative';
import type { TimezoneBand } from '../types';
import narrativesFr from '../i18n/narratives.fr';
import narrativesEn from '../i18n/narratives.en';
import citiesFr from '../i18n/cities.fr';
import citiesEn from '../i18n/cities.en';

function makeBands(doneCount: number, activeCount: number): TimezoneBand[] {
  const bands: TimezoneBand[] = [];
  let offset = -12;
  for (let i = 0; i < doneCount; i++) {
    bands.push({ offset: offset++, state: 'done', participantCount: 100 });
  }
  for (let i = 0; i < activeCount; i++) {
    bands.push({ offset: offset++, state: 'active', participantCount: 50 });
  }
  while (bands.length < 38) {
    bands.push({ offset: offset++, state: 'future', participantCount: 0 });
  }
  return bands;
}

describe('computeNarrative (FR)', () => {
  it('returns "wave just started" when few bands are done', () => {
    const result = computeNarrative(makeBands(1, 1), narrativesFr, citiesFr);
    expect(result.headline).toBe('La vague vient de naître');
  });

  it('returns "Asia" narrative for early progress', () => {
    const result = computeNarrative(makeBands(6, 1), narrativesFr, citiesFr);
    expect(result.headline).toContain('Asie');
  });

  it('returns "half the world" narrative around 50%', () => {
    // 16/38 = 42% → < 0.5 → waveHalf
    const result = computeNarrative(makeBands(16, 1), narrativesFr, citiesFr);
    expect(result.headline).toContain('moitié');
  });

  it('returns "Europe/Africa" narrative around 70%', () => {
    // 24/38 = 63% → < 0.7 → waveEuropeAfrica
    const result = computeNarrative(makeBands(24, 1), narrativesFr, citiesFr);
    expect(result.headline).toContain('Europe');
  });

  it('returns "Americas" narrative around 80%', () => {
    // 30/38 = 79% → < 0.9 → waveAmericas
    const result = computeNarrative(makeBands(30, 1), narrativesFr, citiesFr);
    expect(result.headline).toContain('Amériques');
  });

  it('returns "tour du monde" when wave is complete', () => {
    // 35/38 = 92% → >= 0.9 → waveComplete
    const result = computeNarrative(makeBands(35, 1), narrativesFr, citiesFr);
    expect(result.headline).toContain('tour du monde');
  });

  it('always returns headline and detail', () => {
    for (let done = 0; done <= 37; done++) {
      const bands = makeBands(done, done < 38 ? 1 : 0);
      const result = computeNarrative(bands, narrativesFr, citiesFr);
      expect(result.headline).toBeTruthy();
      expect(result.detail).toBeTruthy();
    }
  });
});

describe('computeNarrative (EN)', () => {
  it('returns English headline for early wave', () => {
    const result = computeNarrative(makeBands(1, 1), narrativesEn, citiesEn);
    expect(result.headline).toBe('The wave has just begun');
  });

  it('returns English headline for complete wave', () => {
    // 35/38 = 92% → >= 0.9 → waveComplete
    const result = computeNarrative(makeBands(35, 1), narrativesEn, citiesEn);
    expect(result.headline).toContain('circled the globe');
  });
});
