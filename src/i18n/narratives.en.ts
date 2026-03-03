import type { NarrativeTemplates } from './types';
import { deepFreeze } from '../lib/integrity';

const narrativesEn: NarrativeTemplates = {
  waveJustStarted: {
    headline: 'The wave has just begun',
    detailWithCity: 'It starts in {city}.',
    detailFallback: 'The first timezone has just started.',
  },
  waveAsia: {
    headline: 'The wave crosses Asia',
    detailWithCities: "After {lastCity}, it\u2019s {activeCity}\u2019s turn.",
    detailFallback: 'The wave moves westward, one timezone at a time.',
  },
  waveHalf: {
    headline: 'Half the world has shared this moment',
    detailWithCity: "Now it\u2019s {city}.{next}",
    detailFallback: 'The wave has already crossed half the planet.',
    soon: ' Soon, {city}.',
  },
  waveEuropeAfrica: {
    headline: 'This wave crosses the world',
    detailWithCity: '',
    detailFallback: '',
  },
  waveAmericas: {
    headline: 'The wave reaches the Americas',
    detailWithCity: '{city} takes over.',
    detailFallback: 'The last timezones join the movement.',
  },
  waveComplete: {
    headline: 'The wave has circled the globe',
    detail: 'In 24 hours, the entire Earth has shared the same gesture.',
  },
};

export default deepFreeze(narrativesEn);
