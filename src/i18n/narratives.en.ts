import type { NarrativeTemplates } from './types';
import { deepFreeze } from '../lib/integrity';

const narrativesEn: NarrativeTemplates = {
  waveJustStarted: {
    headline: 'The wave has just begun',
    detailWithCity: 'Right now, someone in {city} is doing the exact same thing as you.',
    detailFallback: 'The first timezone has just started.',
  },
  waveAsia: {
    headline: 'The wave crosses Asia',
    detailWithCities: "After {lastCity}, it's {activeCity}'s turn. The wave grows.",
    detailFallback: 'The wave moves westward, one timezone at a time.',
  },
  waveHalf: {
    headline: 'Half the world has shared this moment',
    detailWithCity: "Now it's {city}.{next}",
    detailFallback: 'The wave has already crossed half the planet.',
    soon: ' Soon, {city}.',
  },
  waveEuropeAfrica: {
    headline: 'The wave crosses Europe and Africa',
    detailWithCity: 'Right now in {city}, someone is closing their eyes just like you.',
    detailFallback: 'Europe and Africa join the movement.',
  },
  waveAmericas: {
    headline: 'The wave reaches the Americas',
    detailWithCity: '{city} takes over. The wave is almost complete.',
    detailFallback: 'The last timezones are awakening.',
  },
  waveComplete: {
    headline: 'The wave has circled the globe',
    detail: 'In 24 hours, the entire Earth has shared the same gesture.',
  },
};

export default deepFreeze(narrativesEn);
