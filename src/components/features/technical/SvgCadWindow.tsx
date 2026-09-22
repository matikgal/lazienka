import { CAD_FONTS, CAD_STROKES } from '../../../utils/cadStyles';

export function SvgCadWindow() {
  const wx1 = 311;
  const wx2 = 384;
  const wy1 = 346;
  const wy2 = 429;
  const wWidth = wx2 - wx1;
  const wHeight = wy2 - wy1;
  const midX = (wx1 + wx2) / 2;
  const midY = (wy1 + wy2) / 2;

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
        x={midX - 68}
        y={midY - 8}
        width="136"
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
        OKNO DACHOWE 73×115 cm
      </text>

      {/* Position annotations */}
      <rect x={midX - 55} y={wy1 - 13} width="110" height="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
      <text x={midX} y={wy1 - 7.5} textAnchor="middle" dominantBaseline="central" fontSize="7px" fontFamily={CAD_FONTS.main} fill="#475569">
        73 cm od załamania skosu
      </text>

      <rect x={midX - 55} y={wy2 + 2} width="110" height="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
      <text x={midX} y={wy2 + 7.5} textAnchor="middle" dominantBaseline="central" fontSize="7px" fontFamily={CAD_FONTS.main} fill="#475569">
        33 cm nad ścianką C
      </text>
    </g>
  );
}
