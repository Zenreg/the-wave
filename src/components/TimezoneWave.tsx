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

export default function TimezoneWave({ bands, width, height }: TimezoneWaveProps) {
  const bandWidth = width / bands.length;

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

      {bands.map((band, i) => (
        <rect
          key={band.offset}
          x={i * bandWidth}
          y={0}
          width={bandWidth}
          height={height}
          fill={bandColor(band)}
          filter={band.state === 'active' ? 'url(#tz-glow)' : undefined}
          className={band.state === 'active' ? 'animate-glow-pulse' : ''}
          style={{ transition: 'fill 2s ease-in-out' }}
        />
      ))}
    </g>
  );
}
