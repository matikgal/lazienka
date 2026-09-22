import { CAD_COLORS, CAD_FONTS, CAD_STROKES } from '../../../utils/cadStyles';
import { CURRENT_ROOF_CONFIG, getRoofSlopeDegrees } from '../../../utils/roofProfile';
import { CadDimensionElement } from './CadDimensionElement';

export function CadSectionView() {
  const slopeDeg = getRoofSlopeDegrees();
  const ox = 75, oy = 350, sx = 1.35, sy = 1.0;
  const hA = CURRENT_ROOF_CONFIG.maxCeilingHeight;
  const hC = CURRENT_ROOF_CONFIG.kneeWallHeight;
  const dFlat = CURRENT_ROOF_CONFIG.slantStartFromA;
  const dTotal = CURRENT_ROOF_CONFIG.totalRoomDepth;

  const pFloorA = { x: ox, y: oy };
  const pFloorC = { x: ox + dTotal * sx, y: oy };
  const pTopA = { x: ox, y: oy - hA * sy };
  const pSlantStart = { x: ox + dFlat * sx, y: oy - hA * sy };
  const pTopC = { x: ox + dTotal * sx, y: oy - hC * sy };

  // Window along slope: 73 cm from slant top, 115 cm length
  const rad = (slopeDeg * Math.PI) / 180;
  const winTop = { x: pSlantStart.x + 73 * Math.cos(rad) * sx, y: pSlantStart.y + 73 * Math.sin(rad) * sy };
  const winBottom = { x: pSlantStart.x + 188 * Math.cos(rad) * sx, y: pSlantStart.y + 188 * Math.sin(rad) * sy };
  const yH190 = oy - 190 * sy;

  return (
    <div className="cad-view-wrapper">
      <svg viewBox="0 0 625 440" className="cad-svg-canvas" aria-label="Przekrój pionowy przez skos łazienki">
        <rect width="625" height="440" fill={CAD_COLORS.paperBg} />
        <line x1={ox - 30} y1={oy} x2={pFloorC.x + 40} y2={oy} stroke="#475569" strokeWidth="1.2" />
        <text x={ox - 35} y={oy + 3} fill="#475569" fontSize="8px" fontFamily={CAD_FONTS.main} textAnchor="end">
          ±0.00 (POSADZKA)
        </text>

        {/* Room cross-section profile */}
        <polygon
          points={`${pFloorA.x},${pFloorA.y} ${pTopA.x},${pTopA.y} ${pSlantStart.x},${pSlantStart.y} ${pTopC.x},${pTopC.y} ${pFloorC.x},${pFloorC.y}`}
          fill={CAD_COLORS.floorBg}
          stroke={CAD_COLORS.wallStroke}
          strokeWidth={CAD_STROKES.wall}
          strokeLinejoin="miter"
        />

        {/* 1.90m height guideline (usable area) */}
        <line x1={ox} y1={yH190} x2={pFloorC.x} y2={yH190} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="4,4" />
        <text x={ox + 10} y={yH190 - 4} fill="#64748b" fontSize="7.5px" fontFamily={CAD_FONTS.main}>
          h = 190 cm (granica powierzchni użytkowej)
        </text>

        {/* Roof Window in slope */}
        <line x1={winTop.x} y1={winTop.y} x2={winBottom.x} y2={winBottom.y} stroke="#0284c7" strokeWidth="3.5" />
        <rect
          x={(winTop.x + winBottom.x) / 2 - 60}
          y={(winTop.y + winBottom.y) / 2 - 18}
          width="120"
          height="13"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="0.6"
          rx="2"
        />
        <text
          x={(winTop.x + winBottom.x) / 2}
          y={(winTop.y + winBottom.y) / 2 - 11.5}
          fill="#0284c7"
          fontSize="7.5px"
          fontWeight="bold"
          fontFamily={CAD_FONTS.main}
          textAnchor="middle"
          dominantBaseline="central"
        >
          OKNO DACHOWE (115 cm)
        </text>

        {/* Slant pitch annotation */}
        <rect x={(pSlantStart.x + pTopC.x) / 2 - 80} y={(pSlantStart.y + pTopC.y) / 2 - 38} width="160" height="15" fill="#ffffff" stroke="#fde68a" strokeWidth="0.6" rx="2" />
        <text x={(pSlantStart.x + pTopC.x) / 2} y={(pSlantStart.y + pTopC.y) / 2 - 30} fill={CAD_COLORS.slantLine} fontSize="8px" fontWeight="bold" fontFamily={CAD_FONTS.main} textAnchor="middle" dominantBaseline="central">
          SKOS DACHU: {slopeDeg}° (POŁAĆ 194.9 cm)
        </text>

        <CadDimensionElement data={{ x1: ox, y1: oy, x2: ox, y2: oy - hA * sy, offset: 35, text: `${hA} cm`, badge: 'Ściana A' }} />
        <CadDimensionElement data={{ x1: pTopC.x, y1: pTopC.y, x2: pFloorC.x, y2: oy, offset: 35, text: `${hC} cm`, badge: 'Ściana C' }} />
        <CadDimensionElement data={{ x1: pTopA.x, y1: pTopA.y, x2: pSlantStart.x, y2: pSlantStart.y, offset: 25, text: `${dFlat} cm (sufit płaski)` }} />
        <CadDimensionElement data={{ x1: pFloorC.x, y1: oy, x2: pFloorA.x, y2: oy, offset: 35, text: `${dTotal} cm (całkowita długość [B])` }} />
      </svg>
    </div>
  );
}
