import type { WallDefinition } from '../../../types/wall';
import type { CadTransformState } from '../../../types/cadTransform';
import { SVG_WIDTH, SVG_HEIGHT, toSvgPoint } from '../../../utils/technicalMath';
import { transformCadPoint } from '../../../utils/cadTransformMath';
import { CAD_COLORS } from '../../../utils/cadStyles';
import { SvgCadWindow } from './SvgCadWindow';
import { CadWallSvgItem } from './CadWallSvgItem';
import { CadTitleBlock } from './CadTitleBlock';
import { CadOuterDimensions } from './CadOuterDimensions';
import { CadDefs } from './CadDefs';

import { CadSlantZoneSvg } from './CadSlantZoneSvg';

interface CadPlanViewProps {
  readonly walls: readonly WallDefinition[];
  readonly transform: CadTransformState;
}

export function CadPlanView({ walls, transform }: CadPlanViewProps) {
  const polygonPoints = walls
    .map((w) => {
      const p = transformCadPoint(toSvgPoint(w.start), transform);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <div className="cad-view-wrapper">
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="cad-svg-canvas"
        aria-label="Czysty rysunek techniczny rzutu poziomego łazienki"
      >
        <CadDefs />
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill={CAD_COLORS.paperBg} />
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#cadGridMain)" />
        <polygon points={polygonPoints} fill={CAD_COLORS.floorBg} stroke="#94a3b8" strokeWidth="0.8" />

        <CadSlantZoneSvg transform={transform} />
        <CadTitleBlock />
        <SvgCadWindow transform={transform} />

        {walls.map((w) => (
          <CadWallSvgItem key={w.id} wall={w} transform={transform} />
        ))}

        <CadOuterDimensions transform={transform} />
      </svg>
    </div>
  );
}
