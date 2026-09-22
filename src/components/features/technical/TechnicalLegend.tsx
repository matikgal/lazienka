import type { WallDefinition } from '../../../types/wall';
import { CURRENT_ROOF_CONFIG, getRoofSlopeDegrees } from '../../../utils/roofProfile';
import { formatHeightRange } from '../../../utils/technicalMath';

interface TechnicalLegendProps {
  readonly walls: readonly WallDefinition[];
}

function getLegendHeight(wall: WallDefinition): string {
  if (wall.id === 'w2') {
    return '0-183 cm: 257.5 cm | od 183 cm: 257.5 → 123 cm';
  }
  if (wall.id === 'w4-3') {
    return '0-52 cm: 207.9 → 257.5 cm | 52-75.5 cm: 257.5 cm';
  }
  return formatHeightRange(wall.startHeight, wall.endHeight, wall.height);
}

export function TechnicalLegend({ walls }: TechnicalLegendProps) {
  const slopeDeg = getRoofSlopeDegrees();

  return (
    <div className="technical-legend">
      <div className="legend-header">Wykaz wymiarów i wysokości ścian (Rzut Techniczny)</div>
      <table className="legend-table">
        <thead>
          <tr>
            <th>Ściana</th>
            <th>Długość</th>
            <th>Wysokość</th>
            <th>Kierunek / Funkcja</th>
          </tr>
        </thead>
        <tbody>
          {walls.map((w) => (
            <tr key={w.id} className={w.isDoorway ? 'row-door' : ''}>
              <td>
                <span className="legend-badge">[{w.label}]</span>
              </td>
              <td><strong>{w.length} cm</strong></td>
              <td>{getLegendHeight(w)}</td>
              <td>{w.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="legend-footer">
        <span>Ściana [A] = pełna wys. {CURRENT_ROOF_CONFIG.maxCeilingHeight} cm | Ściana [C] = ścianka kolankowa {CURRENT_ROOF_CONFIG.kneeWallHeight} cm</span>
        <span>Początek skosu = {CURRENT_ROOF_CONFIG.slantStartFromA} cm od ściany [A] (spadek 134.5 cm / kąt {slopeDeg}°)</span>
        <span>Okno dachowe = 73 × 115 cm (od ściany B: 100 cm, od ściany D: 212 cm, 33 cm nad ścianką C, 73 cm od załamania skosu)</span>
      </div>
    </div>
  );
}
