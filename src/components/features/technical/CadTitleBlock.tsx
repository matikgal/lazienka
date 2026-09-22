import { CAD_COLORS, CAD_FONTS } from '../../../utils/cadStyles';

export function CadTitleBlock() {
  const ox = 380;
  const oy = 16;
  const width = 220;
  const height = 76;

  return (
    <g className="cad-title-block">
      {/* Title box frame */}
      <rect
        x={ox}
        y={oy}
        width={width}
        height={height}
        fill="#ffffff"
        stroke="#94a3b8"
        strokeWidth="0.8"
        rx="2"
      />
      {/* Header bar */}
      <rect x={ox} y={oy} width={width} height={18} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
      <text
        x={ox + 8}
        y={oy + 12.5}
        fill={CAD_COLORS.wallStroke}
        fontSize="8.5px"
        fontWeight="bold"
        fontFamily={CAD_FONTS.title}
        dominantBaseline="central"
      >
        METRYCZKA POMIESZCZENIA
      </text>
      <text
        x={ox + width - 8}
        y={oy + 12.5}
        textAnchor="end"
        fill="#64748b"
        fontSize="7.5px"
        fontFamily={CAD_FONTS.main}
        dominantBaseline="central"
      >
        KĄTY: 90° | JEDN.: cm
      </text>

      {/* Info lines */}
      <text x={ox + 8} y={oy + 30} fill="#334155" fontSize="7.5px" fontFamily={CAD_FONTS.main}>
        Powierzchnia podłogi: <tspan fontWeight="bold">10.11 m²</tspan>
      </text>
      <text x={ox + 8} y={oy + 42} fill="#334155" fontSize="7.5px" fontFamily={CAD_FONTS.main}>
        Obwód ścian: <tspan fontWeight="bold">14.18 m</tspan> (10 segmentów)
      </text>
      <text x={ox + 8} y={oy + 54} fill="#334155" fontSize="7.5px" fontFamily={CAD_FONTS.main}>
        Wysokości: <tspan fontWeight="bold">A = 257.5 cm</tspan> | <tspan fontWeight="bold">C = 123.0 cm</tspan>
      </text>
      <text x={ox + 8} y={oy + 66} fill="#b45309" fontSize="7.5px" fontWeight="bold" fontFamily={CAD_FONTS.main}>
        Skos dachu: 43.6° (od 183 cm od ściany A)
      </text>
    </g>
  );
}
