import { CAD_FONTS, CAD_STROKES } from '../../../utils/cadStyles';

export function SvgCadWindow() {
  const wx1 = 210; // 110 + 100 cm from Wall B
  const wx2 = 283; // 210 + 73 cm width
  const wy1 = 346; // 73 cm from slant top
  const wy2 = 429; // 33 cm from knee wall C
  const wWidth = wx2 - wx1;
  const wHeight = wy2 - wy1;
  const midX = (wx1 + wx2) / 2;
  const midY = (wy1 + wy2) / 2;
  const refY = 328;

  return (
    <g className="cad-roof-window">
      {/* Outer frame */}
      <rect
        x={wx1}
        y={wy1}
        width={wWidth}
        height={wHeight}
        fill="#f0f9ff"
        stroke="#0284c7"
        strokeWidth={CAD_STROKES.wallDoor}
      />
      {/* Inner glass pane */}
      <rect
        x={wx1 + 3}
        y={wy1 + 3}
        width={wWidth - 6}
        height={wHeight - 6}
        fill="#e0f2fe"
        stroke="#38bdf8"
        strokeWidth="0.8"
      />
      {/* Diagonal sash lines */}
      <line x1={wx1 + 3} y1={wy1 + 3} x2={wx2 - 3} y2={wy2 - 3} stroke="#bae6fd" strokeWidth="0.8" />
      <line x1={wx2 - 3} y1={wy1 + 3} x2={wx1 + 3} y2={wy2 - 3} stroke="#bae6fd" strokeWidth="0.8" />

      {/* Center badge */}
      <rect
        x={midX - 44}
        y={midY - 8}
        width="88"
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
        OKNO 73 × 115
      </text>

      {/* Position annotations along slope */}
      <rect x={midX - 20} y={wy1 - 12} width="40" height="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
      <text x={midX} y={wy1 - 6.5} textAnchor="middle" dominantBaseline="central" fontSize="7.5px" fontFamily={CAD_FONTS.main} fill="#475569">
        73 cm
      </text>

      <rect x={midX - 20} y={wy2 + 2} width="40" height="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
      <text x={midX} y={wy2 + 7.5} textAnchor="middle" dominantBaseline="central" fontSize="7.5px" fontFamily={CAD_FONTS.main} fill="#475569">
        33 cm
      </text>

      {/* Horizontal distance reference to Wall B: 100 cm */}
      <line x1="110" y1={refY} x2={wx1} y2={refY} stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3,2" />
      <rect x={(110 + wx1) / 2 - 24} y={refY - 6} width="48" height="12" fill="#ffffff" stroke="#0284c7" strokeWidth="0.6" rx="2" />
      <text x={(110 + wx1) / 2} y={refY} textAnchor="middle" dominantBaseline="central" fontSize="7.5px" fontWeight="bold" fontFamily={CAD_FONTS.main} fill="#0369a1">
        100 cm
      </text>

      {/* Horizontal distance reference to Wall D: 212 cm */}
      <line x1={wx2} y1={refY} x2="495" y2={refY} stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3,2" />
      <rect x={(wx2 + 495) / 2 - 24} y={refY - 6} width="48" height="12" fill="#ffffff" stroke="#0284c7" strokeWidth="0.6" rx="2" />
      <text x={(wx2 + 495) / 2} y={refY} textAnchor="middle" dominantBaseline="central" fontSize="7.5px" fontWeight="bold" fontFamily={CAD_FONTS.main} fill="#0369a1">
        212 cm
      </text>
    </g>
  );
}
