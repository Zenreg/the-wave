import { useLocale } from '../i18n';
import type { MapDot, GeoPoint } from '../types';
import { WORLD_LAND_PATH } from '../data/worldMapPath';
import TimezoneWave from './TimezoneWave';

interface WorldMapProps {
  waveCenterLng: number;
  dots?: MapDot[];
  myPoint?: GeoPoint;
}

const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;

function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  return {
    x: ((lng + 180) / 360) * SVG_WIDTH,
    y: ((90 - lat) / 180) * SVG_HEIGHT,
  };
}

export default function WorldMap({ waveCenterLng, dots = [], myPoint }: WorldMapProps) {
  const { t } = useLocale();
  const now = new Date();
  const utcDecimal = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;

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
          {dots.map((dot) => {
            // Local solar time at this dot's longitude
            const localHour = ((utcDecimal + dot.point.lng / 15) % 24 + 24) % 24;

            // Only show dots where it's between 19:30 and midnight (wave passed or passing)
            if (localHour < 19.5) return null;

            const { x, y } = geoToSvg(dot.point.lat, dot.point.lng);

            return (
              <circle
                key={dot.id}
                cx={x} cy={y} r={0.8}
                fill="#fbbf24"
                opacity={0.7}
                className="map-dot-core"
              />
            );
          })}
        </g>

        {/* Mon point lumineux — petit, pulsant doucement */}
        {myPoint && (() => {
          const { x, y } = geoToSvg(myPoint.lat, myPoint.lng);
          return (
            <g>
              <circle cx={x} cy={y} r={4} fill="#fbbf24" opacity={0.06} className="my-dot-halo" />
              <circle cx={x} cy={y} r={2} fill="#fbbf24" opacity={0.15} className="my-dot-glow" />
              <circle cx={x} cy={y} r={1} fill="#fbbf24" opacity={0.9} className="my-dot-core" />
            </g>
          );
        })()}
      </svg>

    </div>
  );
}
