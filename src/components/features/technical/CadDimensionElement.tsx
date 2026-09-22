import type { DimensionData } from '../../../utils/cadDimensionMath';
import { computeCadDimensionGeometry } from '../../../utils/cadDimensionMath';
import { CAD_COLORS, CAD_FONTS, CAD_STROKES } from '../../../utils/cadStyles';

interface CadDimensionElementProps {
  readonly data: DimensionData;
}

export function CadDimensionElement({ data }: CadDimensionElementProps) {
  const geom = computeCadDimensionGeometry(data);
  if (!geom) return null;

  return (
    <g className="cad-dimension">
      {/* Extension / witness lines */}
      <line
        x1={geom.witness1.x1}
        y1={geom.witness1.y1}
        x2={geom.witness1.x2}
        y2={geom.witness1.y2}
        stroke={CAD_COLORS.dimLine}
        strokeWidth={CAD_STROKES.dimWitness}
      />
      <line
        x1={geom.witness2.x1}
        y1={geom.witness2.y1}
        x2={geom.witness2.x2}
        y2={geom.witness2.y2}
        stroke={CAD_COLORS.dimLine}
        strokeWidth={CAD_STROKES.dimWitness}
      />

      {/* Main dimension line */}
      <line
        x1={geom.line.x1}
        y1={geom.line.y1}
        x2={geom.line.x2}
        y2={geom.line.y2}
        stroke={CAD_COLORS.dimLine}
        strokeWidth={CAD_STROKES.dimLine}
      />

      {/* 45-degree architectural ticks */}
      <line
        x1={geom.tick1.x1}
        y1={geom.tick1.y1}
        x2={geom.tick1.x2}
        y2={geom.tick1.y2}
        stroke={CAD_COLORS.dimTick}
        strokeWidth={CAD_STROKES.dimTick}
      />
      <line
        x1={geom.tick2.x1}
        y1={geom.tick2.y1}
        x2={geom.tick2.x2}
        y2={geom.tick2.y2}
        stroke={CAD_COLORS.dimTick}
        strokeWidth={CAD_STROKES.dimTick}
      />

      {/* Mask and Dimension text */}
      <g transform={`rotate(${geom.angleDeg} ${geom.textPos.x} ${geom.textPos.y})`}>
        <rect
          x={geom.textPos.x - geom.maskWidth / 2}
          y={geom.textPos.y - geom.maskHeight / 2}
          width={geom.maskWidth}
          height={geom.maskHeight}
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="0.5"
          rx="2"
        />
        <text
          x={geom.textPos.x}
          y={geom.textPos.y + 0.5}
          textAnchor="middle"
          dominantBaseline="central"
          fill={CAD_COLORS.dimText}
          fontSize="9px"
          fontWeight="600"
          fontFamily={CAD_FONTS.main}
        >
          {geom.textLabel}
        </text>
      </g>
    </g>
  );
}
