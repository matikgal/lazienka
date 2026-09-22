import { CAD_COLORS, CAD_FONTS, CAD_STROKES } from '../../../utils/cadStyles';

interface CadDoorSvgProps {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

export function CadDoorSvg({ x1, y1, x2, y2 }: CadDoorSvgProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return null;

  // Outward normal vector
  const vx = dy / len;
  const vy = -dx / len;

  const openLeafX = x2 + vx * len;
  const openLeafY = y2 + vy * len;
  const midX = (x1 + x2) / 2 + vx * 18;
  const midY = (y1 + y2) / 2 + vy * 18;

  return (
    <g className="cad-door-symbol">
      {/* Threshold line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#94a3b8"
        strokeWidth="0.8"
        strokeDasharray="2,2"
      />
      {/* Door jamb stops */}
      <line
        x1={x1 - vx * 3}
        y1={y1 - vy * 3}
        x2={x1 + vx * 3}
        y2={y1 + vy * 3}
        stroke={CAD_COLORS.wallStroke}
        strokeWidth={CAD_STROKES.wall}
      />
      <line
        x1={x2 - vx * 3}
        y1={y2 - vy * 3}
        x2={x2 + vx * 3}
        y2={y2 + vy * 3}
        stroke={CAD_COLORS.wallStroke}
        strokeWidth={CAD_STROKES.wall}
      />

      {/* Door leaf */}
      <line
        x1={x2}
        y1={y2}
        x2={openLeafX}
        y2={openLeafY}
        stroke={CAD_COLORS.wallStroke}
        strokeWidth={CAD_STROKES.wallDoor}
      />

      {/* Quarter circle swing arc */}
      <path
        d={`M ${openLeafX} ${openLeafY} A ${len} ${len} 0 0 1 ${x1} ${y1}`}
        fill="none"
        stroke="#64748b"
        strokeWidth="0.7"
        strokeDasharray="2,2"
      />

      {/* Door label */}
      <text
        x={midX}
        y={midY}
        fill="#059669"
        fontSize="8px"
        fontFamily={CAD_FONTS.main}
        dominantBaseline="central"
      >
        DRZWI 79 cm
      </text>
    </g>
  );
}
