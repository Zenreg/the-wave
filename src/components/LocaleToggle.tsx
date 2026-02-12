import { useLocale } from '../i18n';

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-0.5 text-xs font-light">
      <button
        onClick={() => setLocale('fr')}
        className={`px-2 py-1 rounded-l transition-colors ${
          locale === 'fr'
            ? 'text-white/70 bg-white/10'
            : 'text-white/25 hover:text-white/40'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-2 py-1 rounded-r transition-colors ${
          locale === 'en'
            ? 'text-white/70 bg-white/10'
            : 'text-white/25 hover:text-white/40'
        }`}
      >
        EN
      </button>
    </div>
  );
}
