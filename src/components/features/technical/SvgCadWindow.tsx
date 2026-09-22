import type { CadTransformState } from '../../../types/cadTransform';
import { toSvgX, toSvgY } from '../../../utils/technicalMath';
import { transformCadPoint } from '../../../utils/cadTransformMath';
import { CAD_FONTS, CAD_STROKES } from '../../../utils/cadStyles';
import { CURRENT_ROOF_WINDOW } from '../../../types/window';

interface SvgCadWindowProps {
  readonly transform: CadTransformState;
}

export function SvgCadWindow({ transform }: SvgCadWindowProps) {
  const win = CURRENT_ROOF_WINDOW;
  const wx1 = toSvgX(-143 + win.distFromLeft);
  const wx2 = toSvgX(-143 + win.distFromLeft + win.width);
  const wyTop = toSvgY(-236);
  const wyBottom = toSvgY(-319);

  const c1 = transformCadPoint({ x: wx1, y: wyTop }, transform);
  const c2 = transformCadPoint({ x: wx2, y: wyTop }, transform);
  const c3 = transformCadPoint({ x: wx2, y: wyBottom }, transform);
  const c4 = transformCadPoint({ x: wx1, y: wyBottom }, transform);

  const midX = (c1.x + c3.x) / 2;
  const midY = (c1.y + c3.y) / 2;

  const polyPoints = `${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} ${c4.x},${c4.y}`;

  return (
    <g className="cad-roof-window">
      {/* Outer frame */}
      <polygon
        points={polyPoints}
        fill="#f0f9ff"
        stroke="#0284c7"
        strokeWidth={CAD_STROKES.wallDoor}
      />
      {/* Inner glass diagonals */}
      <line x1={c1.x} y1={c1.y} x2={c3.x} y2={c3.y} stroke="#bae6fd" strokeWidth="0.8" />
      <line x1={c2.x} y1={c2.y} x2={c4.x} y2={c4.y} stroke="#bae6fd" strokeWidth="0.8" />

      {/* Center title badge with white mask */}
      <rect
        x={midX - 70}
        y={midY - 8}
        width="140"
        height="16"
        fill="#ffffff"
        stroke="#0284c7"
        strokeWidth="0.8"
        rx="2"
      />
      <text
        x={midX}
        y={midY + 0.5}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#0369a1"
        fontSize="8.5px"
        fontWeight="bold"
        fontFamily={CAD_FONTS.main}
      >
        OKNO DACHOWE {win.width}×{win.height} cm
      </text>

      {/* Position annotations with white masks */}
      <g>
        <rect x={midX - 55} y={wyTop - 14} width="110" height="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
        <text x={midX} y={wyTop - 8} textAnchor="middle" dominantBaseline="central" fontSize="7.5px" fontFamily={CAD_FONTS.main} fill="#475569">
          73 cm od załamania skosu
        </text>

        <rect x={midX - 55} y={wyBottom + 3} width="110" height="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
        <text x={midX} y={wyBottom + 9} textAnchor="middle" dominantBaseline="central" fontSize="7.5px" fontFamily={CAD_FONTS.main} fill="#475569">
          33 cm nad ścianką C
        </text>
      </g>
    </g>
  );
}
