import { useLocale } from '../i18n';

interface CircularTimerProps {
  secondsLeft: number;
  totalSeconds?: number;
}

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularTimer({ secondsLeft, totalSeconds = 60 }: CircularTimerProps) {
  const progress = secondsLeft / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const { t } = useLocale();

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle
          cx="100" cy="100" r={RADIUS}
          fill="none"
          stroke="rgba(129,140,248,0.1)"
          strokeWidth="3"
        />
        <circle
          cx="100" cy="100" r={RADIUS}
          fill="none"
          stroke="rgba(129,140,248,0.6)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl sm:text-6xl font-extralight tabular-nums text-white"
              role="timer"
              aria-label={t('timer.aria', { seconds: secondsLeft })}
        >
          {secondsLeft}
        </span>
      </div>
    </div>
  );
}
