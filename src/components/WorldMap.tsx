import { useLocale } from '../i18n';
import type { TimezoneBand, MapDot } from '../types';
import { WORLD_LAND_PATH } from '../data/worldMapPath';
import TimezoneWave from './TimezoneWave';

interface WorldMapProps {
  bands: TimezoneBand[];
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

export default function WorldMap({ bands, dots = [] }: WorldMapProps) {
  const { t } = useLocale();

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

        <TimezoneWave bands={bands} width={SVG_WIDTH} height={SVG_HEIGHT} />

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
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {dots.map((dot) => {
            const { x, y } = geoToSvg(dot.point.lat, dot.point.lng);
            return (
              <circle
                key={dot.id}
                cx={x} cy={y} r={1}
                fill="#fbbf24"
                opacity={0.8}
                filter="url(#dot-glow)"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
