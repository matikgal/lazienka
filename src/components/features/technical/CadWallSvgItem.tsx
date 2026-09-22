import type { WallDefinition } from '../../../types/wall';
import type { CadTransformState } from '../../../types/cadTransform';
import { toSvgPoint } from '../../../utils/technicalMath';
import { transformCadPoint } from '../../../utils/cadTransformMath';
import { CAD_COLORS, CAD_STROKES } from '../../../utils/cadStyles';
import { CadDimensionElement } from './CadDimensionElement';
import { CadDoorSvg } from './CadDoorSvg';

interface CadWallSvgItemProps {
  readonly wall: WallDefinition;
  readonly transform: CadTransformState;
}

function getWallDimensionOffset(wall: WallDefinition): number {
  if (wall.id === 'w4-2') return 22; // E (11 cm)
  if (wall.id === 'w4-4') return 22; // G (132 cm)
  if (wall.id === 'w4-3') return 25; // F (75.5 cm)
  if (wall.id === 'w4-5' || wall.id === 'w4-6' || wall.id === 'w4-7') return 30; // H, I, J aligned
  return 32; // Outer walls A, B, C, D
}

export function CadWallSvgItem({ wall, transform }: CadWallSvgItemProps) {
  const p1 = transformCadPoint(toSvgPoint(wall.start), transform);
  const p2 = transformCadPoint(toSvgPoint(wall.end), transform);

  return (
    <g className="cad-wall-item">
      {wall.isDoorway ? (
        <CadDoorSvg x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
      ) : (
        <line
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke={CAD_COLORS.wallStroke}
          strokeWidth={CAD_STROKES.wall}
          strokeLinecap="square"
        />
      )}
      <CadDimensionElement
        data={{
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          offset: getWallDimensionOffset(wall),
          text: `${wall.length} cm`,
          badge: wall.label,
        }}
      />
    </g>
  );
}
