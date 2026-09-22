import { CAD_COLORS, CAD_FONTS } from '../../../utils/cadStyles';

export function CadTitleBlock() {
  return (
    <g className="cad-title-block">
      {/* Title box frame */}
      <rect
        x="20"
        y="16"
        width="215"
        height="76"
        fill="#ffffff"
        stroke="#94a3b8"
        strokeWidth="0.8"
        rx="2"
      />
      {/* Header bar */}
      <rect x="20" y="16" width="215" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
      <text
        x="28"
        y="29"
        fill={CAD_COLORS.wallStroke}
        fontSize="9px"
        fontWeight="bold"
        fontFamily={CAD_FONTS.title}
      >
        METRYCZKA POMIESZCZENIA
      </text>
      <text
        x="228"
        y="29"
        textAnchor="end"
        fill="#64748b"
        fontSize="8px"
        fontFamily={CAD_FONTS.main}
      >
        KĄTY: 90° | JEDN.: cm
      </text>

      {/* Info lines */}
      <text x="28" y="47" fill="#334155" fontSize="8px" fontFamily={CAD_FONTS.main}>
        Powierzchnia podłogi: <tspan fontWeight="bold">10.11 m²</tspan>
      </text>
      <text x="28" y="59" fill="#334155" fontSize="8px" fontFamily={CAD_FONTS.main}>
        Obwód ścian: <tspan fontWeight="bold">14.18 m</tspan> (10 segmentów)
      </text>
      <text x="28" y="71" fill="#334155" fontSize="8px" fontFamily={CAD_FONTS.main}>
        Wysokości: <tspan fontWeight="bold">A = 257.5 cm</tspan> | <tspan fontWeight="bold">C = 123.0 cm</tspan>
      </text>
      <text x="28" y="83" fill="#b45309" fontSize="8px" fontWeight="bold" fontFamily={CAD_FONTS.main}>
        Skos dachu: 43.6° (odcinek 141 cm od linii 183 cm)
      </text>
    </g>
  );
}
