import { useLocale } from '../i18n';
import type { MapDot } from '../types';
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

/**
 * Signed angular distance from center to point (positive = east, negative = west).
 * Normalized to [-180, 180].
 */
function angularDist(center: number, point: number): number {
  let d = point - center;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

export default function WorldMap({ waveCenterLng, dots = [] }: WorldMapProps) {
  const { t } = useLocale();
  const halfBand = 7.5; // half of 15° band

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
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {dots.map((dot) => {
            const { x, y } = geoToSvg(dot.point.lat, dot.point.lng);
            const d = angularDist(waveCenterLng, dot.point.lng);

            // In band → bright yellow with glow
            // Behind band (east, d > halfBand) → dim yellow, no glow
            // Ahead of band (west, d < -halfBand) → hidden
            if (d < -halfBand) return null;

            const inBand = Math.abs(d) <= halfBand;

            return (
              <circle
                key={dot.id}
                cx={x} cy={y} r={inBand ? 3 : 2}
                fill="#fbbf24"
                opacity={inBand ? 0.95 : 0.35}
                filter="url(#dot-glow)"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
