import type { NarrativeTemplates } from './types';
import { deepFreeze } from '../lib/integrity';

const narrativesFr: NarrativeTemplates = {
  waveJustStarted: {
    headline: 'La vague vient de naître',
    detailWithCity: "En ce moment, quelqu'un à {city} fait exactement la même chose que toi.",
    detailFallback: 'Le premier fuseau horaire vient de commencer.',
  },
  waveAsia: {
    headline: "La vague traverse l'Asie",
    detailWithCities: "Après {lastCity}, c'est au tour de {activeCity}. La vague grandit.",
    detailFallback: "La vague progresse vers l'ouest, un fuseau après l'autre.",
  },
  waveHalf: {
    headline: 'La moitié du monde a partagé ce moment',
    detailWithCity: "Maintenant c'est {city}.{next}",
    detailFallback: 'La vague a déjà traversé la moitié de la planète.',
    soon: ' Bientôt, {city}.',
  },
  waveEuropeAfrica: {
    headline: "La vague traverse l'Europe et l'Afrique",
    detailWithCity: "En ce moment à {city}, quelqu'un ferme les yeux comme toi.",
    detailFallback: "L'Europe et l'Afrique rejoignent le mouvement.",
  },
  waveAmericas: {
    headline: 'La vague atteint les Amériques',
    detailWithCity: '{city} prend le relais. La vague est presque complète.',
    detailFallback: "Les derniers fuseaux horaires s'éveillent.",
  },
  waveComplete: {
    headline: 'La vague a fait le tour du monde',
    detail: 'En 24 heures, la Terre entière a partagé le même geste.',
  },
};

export default deepFreeze(narrativesFr);
