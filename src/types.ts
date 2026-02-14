/** The 5 screens of the app, forming a linear state machine */
export type AppScreen = 'landing' | 'countdown' | 'action' | 'participating' | 'result';

/** A daily action fetched from Supabase */
export interface DailyAction {
  date: string;          // 'MM-DD'
  actionText: string;    // French text
  actionTextEn?: string; // English (future)
}

/** A participation record (for insert) */
export interface Participation {
  date: string;          // 'YYYY-MM-DD' local date
  tz_offset: number;     // UTC offset in hours
}

/** Timezone band state for the world map */
export type TzBandState = 'future' | 'active' | 'done';

/** Data for a single timezone band on the map */
export interface TimezoneBand {
  offset: number;        // -12 to +14
  state: TzBandState;
  participantCount: number;
}

/** A geographic coordinate */
export interface GeoPoint {
  lat: number;   // -90 to 90
  lng: number;   // -180 to 180
}

/** A dot on the world map (self or received via broadcast) */
export interface MapDot {
  id: string;
  point: GeoPoint;
  timestamp: number;
}

/** Realtime broadcast payload when someone participates */
export interface ParticipationBroadcast {
  tzOffset: number;
  date: string;
  point?: GeoPoint;
}

/** LocalStorage keys */
export const STORAGE_KEYS = {
  PARTICIPATED_PREFIX: 'wave_participated_',  // + YYYY-MM-DD
  HAS_ENTERED: 'wave_has_entered',
  AUDIO_MUTED: 'wave_audio_muted',
} as const;
