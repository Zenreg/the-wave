export type Locale = 'fr' | 'en';

export interface TranslationKeys {
  // LandingScreen
  'landing.tagline': string;
  'landing.concept1': string;
  'landing.concept2': string;
  'landing.concept3': string;
  'landing.enter': string;
  'landing.install': string;
  'landing.installIOS': string;

  // CountdownScreen
  'countdown.nextMoment': string;
  'countdown.timerAria': string;
  'countdown.todayAction': string;
  'countdown.localTime': string;
  'countdown.waveStarted': string;
  'countdown.waveNotStarted': string;
  'countdown.yesterday': string;
  'countdown.beFirst': string;

  // ActionScreen
  'action.duration': string;
  'action.cta': string;
  'action.fallback': string;

  // ResultScreen
  'result.participantLabel': string;
  'result.pioneerLabel': string;
  'result.nearYou': string;
  'result.yesterday': string;
  'result.comeBack': string;
  'result.share': string;
  'result.shareText': string;
  'result.linkCopied': string;
  'result.addToCalendar': string;

  // CircularTimer
  'timer.aria': string;

  // WorldMap
  'map.aria': string;

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
