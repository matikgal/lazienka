import type { WallDefinition } from '../../../types/wall';
import { Card } from '../../ui/Card';
import { CURRENT_ROOF_CONFIG, getRoofSlopeDegrees } from '../../../utils/roofProfile';

interface WallListPanelProps {
  readonly walls: readonly WallDefinition[];
  readonly totalLength: number;
}

function getWallHeightDescription(wall: WallDefinition): string {
  if (wall.id === 'w2') {
    return '0-183 cm: wys. 257.5 cm (płaski sufit) → od 183 cm: skos opada do 123.0 cm';
  }
  if (wall.id === 'w4-3') {
    return '0-52 cm: skos 207.9 → 257.5 cm → 52-75.5 cm: wys. 257.5 cm (płaski)';
  }
  if (wall.startHeight && wall.endHeight && Math.abs(wall.startHeight - wall.endHeight) > 0.1) {
    return `Wysokość: ${wall.startHeight} cm → ${wall.endHeight} cm (skos)`;
  }
  return `Wysokość: ${wall.height} cm`;
}

export function WallListPanel({ walls, totalLength }: WallListPanelProps) {
  const slopeDeg = getRoofSlopeDegrees();

  return (
    <Card title="Wymiary ścian i wysokości (skos)">
      <div className="wall-list">
        {walls.map((wall) => (
          <div key={wall.id} className="wall-item">
            <div className="wall-item-header">
              <span className={`wall-badge ${wall.isDoorway ? 'wall-badge-door' : ''}`}>
                [{wall.label}] {wall.isDoorway ? 'Drzwi' : `Ściana ${wall.label}`}
              </span>
              <span className="wall-length">{wall.length} cm</span>
            </div>
            <div className="wall-item-details">
              <span className="slant-indicator">{getWallHeightDescription(wall)}</span>
            </div>
          </div>
        ))}

        <div className="wall-gap-status status-closed">
          <div className="gap-title">Profil dachu i skosu</div>
          <p className="gap-info">
            Wys. max (ściana A): <strong>{CURRENT_ROOF_CONFIG.maxCeilingHeight} cm</strong><br />
            Ścianka kolankowa (ściana C): <strong>{CURRENT_ROOF_CONFIG.kneeWallHeight} cm</strong><br />
            Początek skosu: <strong>{CURRENT_ROOF_CONFIG.slantStartFromA} cm</strong> od ściany A<br />
            Kąt nachylenia dachu: <strong>{slopeDeg}°</strong>
          </p>
        </div>

        <div className="wall-summary">
          <span>Obwód całkowity:</span>
          <strong>{totalLength} cm ({(totalLength / 100).toFixed(2)} m)</strong>
        </div>
      </div>
    </Card>
  );
}
