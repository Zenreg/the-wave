/**
 * Fetches Natural Earth 110m land boundaries GeoJSON
 * and converts to SVG path data for equirectangular projection.
 */

const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;
const GEOJSON_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';

function lngLatToSvg(lng, lat) {
  const x = ((lng + 180) / 360) * SVG_WIDTH;
  const y = ((90 - lat) / 180) * SVG_HEIGHT;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringToPath(ring) {
  return ring.map((coord, i) => {
    const [x, y] = lngLatToSvg(coord[0], coord[1]);
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ') + ' Z';
}

function geometryToPath(geometry) {
  const paths = [];

  if (geometry.type === 'Polygon') {
    for (const ring of geometry.coordinates) {
      paths.push(ringToPath(ring));
    }
  } else if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) {
        paths.push(ringToPath(ring));
      }
    }
  }

  return paths.join(' ');
}

async function main() {
  console.log('Fetching Natural Earth 110m land GeoJSON...');
  const res = await fetch(GEOJSON_URL);
  const geojson = await res.json();

  console.log(`Found ${geojson.features.length} features`);

  const allPaths = geojson.features.map(f => geometryToPath(f.geometry));
  const combined = allPaths.join(' ');

  // Output as TypeScript
  const ts = `/** Auto-generated from Natural Earth 110m land boundaries. Do not edit. */
export const WORLD_LAND_PATH = '${combined}';
`;

  const fs = await import('fs');
  const outPath = new URL('../src/data/worldMapPath.ts', import.meta.url);
  fs.writeFileSync(outPath, ts);
  console.log(`Written to ${outPath.pathname}`);
  console.log(`Path length: ${combined.length} chars`);
}

main().catch(console.error);
