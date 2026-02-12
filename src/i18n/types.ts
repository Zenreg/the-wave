export type Locale = 'fr' | 'en';

export interface TranslationKeys {
  // LandingScreen
  'landing.tagline': string;
  'landing.enter': string;

  // CountdownScreen
  'countdown.nextMoment': string;
  'countdown.timerAria': string;
  'countdown.todayAction': string;
  'countdown.localTime': string;

  // ActionScreen
  'action.durationDebug': string;
  'action.duration': string;
  'action.cta': string;
  'action.fallback': string;

  // ResultScreen
  'result.participantLabel': string;
  'result.nearYou': string;
  'result.comeBack': string;

  // CircularTimer
  'timer.aria': string;

  // WorldMap
  'map.aria': string;

  // DebugPanel
  'debug.keyboardHint': string;
}

export interface NarrativeTemplates {
  waveJustStarted: { headline: string; detailWithCity: string; detailFallback: string };
  waveAsia: { headline: string; detailWithCities: string; detailFallback: string };
  waveHalf: { headline: string; detailWithCity: string; detailFallback: string; soon: string };
  waveEuropeAfrica: { headline: string; detailWithCity: string; detailFallback: string };
  waveAmericas: { headline: string; detailWithCity: string; detailFallback: string };
  waveComplete: { headline: string; detail: string };
}

export type CityNames = Record<string, string[]>;
