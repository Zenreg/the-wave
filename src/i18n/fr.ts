import type { TranslationKeys } from './types';

const fr: TranslationKeys = {
  'landing.tagline': "Chaque jour \u00e0 20h, des millions d'humains partagent la m\u00eame action de 60\u00a0secondes.",
  'landing.enter': 'Entrer',

  'countdown.nextMoment': 'Prochain moment collectif',
  'countdown.timerAria': '{hours} heures {minutes} minutes {seconds} secondes',
  'countdown.todayAction': 'Action du jour',
  'countdown.localTime': '20h00 \u2014 heure locale',

  'action.durationDebug': '5 secondes (debug)',
  'action.duration': '60 secondes, ensemble',
  'action.cta': 'Je le fais',
  'action.fallback': 'Respire profond\u00e9ment.',

  'result.participantLabel': "humains ont partag\u00e9 ce moment aujourd'hui",
  'result.nearYou': 'dont {count} pr\u00e8s de toi',
  'result.comeBack': 'Reviens demain \u00e0 20h',

  'timer.aria': '{seconds} secondes restantes',

  'map.aria': 'Carte du monde montrant la vague de participation par fuseau horaire',

  'debug.keyboardHint': 'Touches 1-5 pour naviguer',
};

export default Object.freeze(fr);
