interface TimezoneWaveProps {
  waveCenterLng: number;
  width: number;
  height: number;
}

/** Convert longitude to SVG x coordinate */
function lngToX(lng: number, width: number): number {
  return ((lng + 180) / 360) * width;
}

export default function TimezoneWave({ waveCenterLng, width, height }: TimezoneWaveProps) {
  const bandWidthDeg = 15; // 1 hour = 15°
  const bandWidthPx = (bandWidthDeg / 360) * width;

  const leftLng = waveCenterLng - bandWidthDeg / 2;
  const rawLeftX = lngToX(leftLng, width);
  const leftX = ((rawLeftX % width) + width) % width;

  const fill = 'rgba(129,140,248,0.35)';

  // Band wraps around the right edge
  if (leftX + bandWidthPx > width) {
    return (
      <g>
        <defs>
          <filter id="tz-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x={leftX} y={0} width={width - leftX} height={height}
          fill={fill} filter="url(#tz-glow)" className="animate-glow-pulse" />
        <rect x={0} y={0} width={(leftX + bandWidthPx) - width} height={height}
          fill={fill} filter="url(#tz-glow)" className="animate-glow-pulse" />
      </g>
    );
  }

  return (
    <g>
      <defs>
        <filter id="tz-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x={leftX} y={0} width={bandWidthPx} height={height}
        fill={fill} filter="url(#tz-glow)" className="animate-glow-pulse" />
    </g>
  );
}
