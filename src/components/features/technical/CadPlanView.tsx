import { CAD_PLAN_WALLS, CAD_PLAN_LAYOUT } from '../../../utils/cadPlanGeometry';
import { CAD_COLORS } from '../../../utils/cadStyles';
import { SvgCadWindow } from './SvgCadWindow';
import { CadWallSvgItem } from './CadWallSvgItem';
import { CadTitleBlock } from './CadTitleBlock';
import { CadOuterDimensions } from './CadOuterDimensions';
import { CadDefs } from './CadDefs';
import { CadSlantZoneSvg } from './CadSlantZoneSvg';

export function CadPlanView() {
  const polygonPoints = CAD_PLAN_WALLS.map((w) => `${w.p1.x},${w.p1.y}`).join(' ');
  const { svgWidth, svgHeight } = CAD_PLAN_LAYOUT;

  return (
    <div className="cad-view-wrapper">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="cad-svg-canvas"
        aria-label="Czysty rysunek techniczny rzutu poziomego łazienki"
      >
        <CadDefs />
        <rect width={svgWidth} height={svgHeight} fill={CAD_COLORS.paperBg} />
        <rect width={svgWidth} height={svgHeight} fill="url(#cadGridMain)" />
        <polygon points={polygonPoints} fill={CAD_COLORS.floorBg} stroke="#94a3b8" strokeWidth="0.8" />

        <CadSlantZoneSvg />
        <CadTitleBlock />

        {CAD_PLAN_WALLS.map((wall) => (
          <CadWallSvgItem key={wall.id} wall={wall} />
        ))}

        <SvgCadWindow />

        <CadOuterDimensions />
      </svg>
    </div>
  );
}
