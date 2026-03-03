import type { NarrativeTemplates } from './types';
import { deepFreeze } from '../lib/integrity';

const narrativesFr: NarrativeTemplates = {
  waveJustStarted: {
    headline: 'La hola vient de na\u00eetre',
    detailWithCity: 'Elle commence \u00e0 {city}.',
    detailFallback: 'Le premier fuseau horaire vient de commencer.',
  },
  waveAsia: {
    headline: "La hola traverse l'Asie",
    detailWithCities: 'Apr\u00e8s {lastCity}, {activeCity} prend le relais.',
    detailFallback: "La hola progresse vers l'ouest, un fuseau apr\u00e8s l'autre.",
  },
  waveHalf: {
    headline: 'La moiti\u00e9 du monde a partag\u00e9 ce moment',
    detailWithCity: "Maintenant c'est {city}.{next}",
    detailFallback: 'La hola a d\u00e9j\u00e0 travers\u00e9 la moiti\u00e9 de la plan\u00e8te.',
    soon: ' Bient\u00f4t, {city}.',
  },
  waveEuropeAfrica: {
    headline: 'Cette hola traverse le monde',
    detailWithCity: '',
    detailFallback: '',
  },
  waveAmericas: {
    headline: 'La hola atteint les Am\u00e9riques',
    detailWithCity: '{city} prend le relais.',
    detailFallback: 'Les derniers fuseaux horaires rejoignent le mouvement.',
  },
  waveComplete: {
    headline: 'La hola a fait le tour du monde',
    detail: 'En 24 heures, la Terre enti\u00e8re a partag\u00e9 le m\u00eame geste.',
  },
};

export default deepFreeze(narrativesFr);
