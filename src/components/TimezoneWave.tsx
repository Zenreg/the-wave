import type { TimezoneBand } from '../types';

interface TimezoneWaveProps {
  bands: TimezoneBand[];
  width: number;
  height: number;
}

function bandColor(band: TimezoneBand): string {
  switch (band.state) {
    case 'active':
      return 'rgba(129,140,248,0.35)';
    case 'done': {
      // Intensity based on participant count (log scale)
      const intensity = band.participantCount > 0
        ? Math.min(0.25, 0.08 + Math.log10(band.participantCount + 1) * 0.04)
        : 0.08;
      return `rgba(251,191,36,${intensity})`;
    }
    case 'future':
      return 'transparent';
  }
}

/** Convert a longitude to SVG x coordinate */
function lngToX(lng: number, width: number): number {
  return ((lng + 180) / 360) * width;
}

export default function TimezoneWave({ bands, width, height }: TimezoneWaveProps) {
  // Each timezone band is 15° wide, centered on offset * 15°
  const bandWidthPx = (15 / 360) * width;

  return (
    <g>
      {/* Glow filter */}
      <defs>
        <filter id="tz-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {bands.map((band) => {
        const centerLng = band.offset * 15;
        const x = lngToX(centerLng - 7.5, width);

        // Handle bands that wrap around the date line
        const rects = [];
        if (x < 0) {
          // Band wraps on the left — draw two parts
          rects.push({ x: 0, w: x + bandWidthPx, key: `${band.offset}-r` });
          rects.push({ x: width + x, w: -x, key: `${band.offset}-l` });
        } else if (x + bandWidthPx > width) {
          // Band wraps on the right
          rects.push({ x, w: width - x, key: `${band.offset}-l` });
          rects.push({ x: 0, w: (x + bandWidthPx) - width, key: `${band.offset}-r` });
        } else {
          rects.push({ x, w: bandWidthPx, key: `${band.offset}` });
        }

        return rects.map(r => (
          <rect
            key={r.key}
            x={r.x}
            y={0}
            width={r.w}
            height={height}
            fill={bandColor(band)}
            filter={band.state === 'active' ? 'url(#tz-glow)' : undefined}
            className={band.state === 'active' ? 'animate-glow-pulse' : ''}
            style={{ transition: 'fill 2s ease-in-out' }}
          />
        ));
      })}
    </g>
  );
}
