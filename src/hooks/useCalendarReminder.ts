import { useLocale } from '../i18n';

/** Génère un fichier .ics avec un événement récurrent quotidien à 20h locale */
export function useCalendarReminder() {
  const { locale } = useLocale();

  const download = () => {
    const title = locale === 'fr' ? 'TheWave — La hola mondiale' : 'TheWave — The global wave';
    const description = locale === 'fr'
      ? 'Rejoins la hola sur jointhewave.fr'
      : 'Join the wave at jointhewave.fr';

    // Événement récurrent : chaque jour à 20h locale, durée 5 min
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TheWave//FR',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      'DTSTART:20260304T200000',
      'DTEND:20260304T200500',
      'RRULE:FREQ=DAILY',
      `URL:https://jointhewave.fr`,
      'BEGIN:VALARM',
      'TRIGGER:-PT5M',
      'ACTION:DISPLAY',
      `DESCRIPTION:${title}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thewave.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return { download };
}
