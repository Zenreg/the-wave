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
        // Normalize x into [0, width)
        const rawX = lngToX(centerLng - 7.5, width);
        const x = ((rawX % width) + width) % width;

        const fill = bandColor(band);
        const filter = band.state === 'active' ? 'url(#tz-glow)' : undefined;
        const className = band.state === 'active' ? 'animate-glow-pulse' : '';
        const style = { transition: 'fill 2s ease-in-out' };

        // Band wraps around the right edge
        if (x + bandWidthPx > width) {
          return [
            <rect key={`${band.offset}-l`} x={x} y={0} width={width - x} height={height}
              fill={fill} filter={filter} className={className} style={style} />,
            <rect key={`${band.offset}-r`} x={0} y={0} width={(x + bandWidthPx) - width} height={height}
              fill={fill} filter={filter} className={className} style={style} />,
          ];
        }

        return (
          <rect key={band.offset} x={x} y={0} width={bandWidthPx} height={height}
            fill={fill} filter={filter} className={className} style={style} />
        );
      })}
    </g>
  );
}
