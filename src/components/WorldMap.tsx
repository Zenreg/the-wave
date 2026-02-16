import { useLocale } from '../i18n';
import type { MapDot } from '../types';
import { computeBandState } from '../hooks/useTimezoneWave';
import { WORLD_LAND_PATH } from '../data/worldMapPath';
import TimezoneWave from './TimezoneWave';

interface WorldMapProps {
  waveCenterLng: number;
  dots?: MapDot[];
}

const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;

function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  return {
    x: ((lng + 180) / 360) * SVG_WIDTH,
    y: ((90 - lat) / 180) * SVG_HEIGHT,
  };
}

export default function WorldMap({ waveCenterLng, dots = [] }: WorldMapProps) {
  const { t } = useLocale();
  const now = new Date();

  // Classify each dot using the band state at its longitude
  let visibleCount = 0;
  const classifiedDots = dots.map(dot => {
    const offset = Math.round(dot.point.lng / 15);
    const clamped = Math.max(-12, Math.min(14, offset));
    const state = computeBandState(clamped, now);
    if (state !== 'future') visibleCount++;
    return { dot, state };
  });

  return (
    <div className="w-full aspect-[2/1] relative rounded-xl overflow-hidden">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-full"
        role="img"
        aria-label={t('map.aria')}
      >
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#0f172a" />

        <path
          d={WORLD_LAND_PATH}
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        <TimezoneWave waveCenterLng={waveCenterLng} width={SVG_WIDTH} height={SVG_HEIGHT} />

        <path
          d={WORLD_LAND_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.3"
          strokeLinejoin="round"
        />

        <g>
          <defs>
            <filter id="dot-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {classifiedDots.map(({ dot, state }) => {
            if (state === 'future') return null;

            const { x, y } = geoToSvg(dot.point.lat, dot.point.lng);
            const inBand = state === 'active';

            return (
              <circle
                key={dot.id}
                cx={x} cy={y} r={inBand ? 2.5 : 1.5}
                fill="#fbbf24"
                opacity={inBand ? 0.95 : 0.35}
                filter="url(#dot-glow)"
              />
            );
          })}
        </g>
      </svg>

      {/* Connection counter */}
      {visibleCount > 0 && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <span
            key={visibleCount}
            className="text-sm text-amber-300/70 font-light tabular-nums animate-fade-in"
          >
            {visibleCount}
          </span>
          <span className="text-xs text-amber-300/40 font-light">
            connexions
          </span>
        </div>
      )}
    </div>
  );
}
