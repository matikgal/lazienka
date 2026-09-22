import type { CadPlanWall } from '../../../utils/cadPlanGeometry';
import { CAD_COLORS, CAD_STROKES } from '../../../utils/cadStyles';
import { CadDimensionElement } from './CadDimensionElement';
import { CadDoorSvg } from './CadDoorSvg';

interface CadWallSvgItemProps {
  readonly wall: CadPlanWall;
}

export function CadWallSvgItem({ wall }: CadWallSvgItemProps) {
  const { p1, p2, isDoorway, length, label, offset } = wall;

  return (
    <g className="cad-wall-item">
      {isDoorway ? (
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
          offset,
          text: `${length} cm`,
          badge: label,
        }}
      />
    </g>
  );
}
