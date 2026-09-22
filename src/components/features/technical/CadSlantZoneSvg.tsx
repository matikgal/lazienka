import type { CadTransformState } from '../../../types/cadTransform';
import { toSvgX, toSvgY } from '../../../utils/technicalMath';
import { transformCadPoint } from '../../../utils/cadTransformMath';
import { CAD_COLORS, CAD_FONTS } from '../../../utils/cadStyles';

interface CadSlantZoneSvgProps {
  readonly transform: CadTransformState;
}

export function CadSlantZoneSvg({ transform }: CadSlantZoneSvgProps) {
  const slantY = toSvgY(-183), slantEndY = toSvgY(-324);
  const leftX = toSvgX(-143), rightX = toSvgX(242);

  const sp1 = transformCadPoint({ x: leftX, y: slantY }, transform);
  const sp2 = transformCadPoint({ x: rightX, y: slantY }, transform);
  const sp3 = transformCadPoint({ x: rightX, y: slantEndY }, transform);
  const sp4 = transformCadPoint({ x: leftX, y: slantEndY }, transform);

  const slantZonePoints = `${sp1.x},${sp1.y} ${sp2.x},${sp2.y} ${sp3.x},${sp3.y} ${sp4.x},${sp4.y}`;
  const midFoldX = (sp1.x + sp2.x) / 2;
  const midFoldY = (sp1.y + sp2.y) / 2;

  return (
    <g className="cad-slant-zone">
      <polygon
        points={slantZonePoints}
        fill="url(#cadSlantHatch)"
        stroke="#cbd5e1"
        strokeWidth="0.6"
      />
      <line
        x1={sp1.x}
        y1={sp1.y}
        x2={sp2.x}
        y2={sp2.y}
        stroke={CAD_COLORS.slantLine}
        strokeWidth="1.2"
        strokeDasharray="8,3,2,3"
      />
      <rect
        x={midFoldX - 170}
        y={midFoldY - 14}
        width="340"
        height="13"
        fill="#ffffff"
        stroke="#fde68a"
        strokeWidth="0.6"
        rx="2"
      />
      <text
        x={midFoldX}
        y={midFoldY - 7.5}
        fill={CAD_COLORS.slantLine}
        fontSize="8px"
        fontWeight="bold"
        fontFamily={CAD_FONTS.main}
        textAnchor="middle"
        dominantBaseline="central"
      >
        ZAŁAMANIE SUFITU (183 cm od ściany A) • SKOS ↓ W KIERUNKU ŚCIANY C (43.6°)
      </text>
    </g>
  );
}
