import { CAD_COLORS, CAD_FONTS } from '../../../utils/cadStyles';

export function CadSlantZoneSvg() {
  const leftX = 110;
  const rightX = 495;
  const slantY = 293; // 183 cm from Wall A
  const slantEndY = 434; // knee wall C
  const midX = (leftX + rightX) / 2;

  // Hatched polygon bounded by room walls
  // From Wall B (110, 293) down to (110, 434), along C to (495, 434), up D to (495, 345), step E to (484, 345), up F to (484, 293)
  const zonePolygon = `${leftX},${slantY} ${leftX},${slantEndY} ${rightX},${slantEndY} ${rightX},345 484,345 484,${slantY}`;

  return (
    <g className="cad-slant-zone">
      <polygon
        points={zonePolygon}
        fill="url(#cadSlantHatch)"
        stroke="#cbd5e1"
        strokeWidth="0.6"
      />
      {/* Slant fold line */}
      <line
        x1={leftX}
        y1={slantY}
        x2="484"
        y2={slantY}
        stroke={CAD_COLORS.slantLine}
        strokeWidth="1.2"
        strokeDasharray="8,3,2,3"
      />
      <rect
        x={midX - 170}
        y={slantY - 14}
        width="340"
        height="13"
        fill="#ffffff"
        stroke="#fde68a"
        strokeWidth="0.6"
        rx="2"
      />
      <text
        x={midX}
        y={slantY - 7.5}
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
