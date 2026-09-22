import { CadDimensionElement } from './CadDimensionElement';

export function CadOuterDimensions() {
  return (
    <g className="cad-outer-dimensions">
      {/* Wall B breakdown along left margin: Flat vs Slant */}
      <CadDimensionElement
        data={{
          x1: 110,
          y1: 293,
          x2: 110,
          y2: 110,
          offset: 65,
          text: '183 cm (płaski sufit)',
        }}
      />
      <CadDimensionElement
        data={{
          x1: 110,
          y1: 434,
          x2: 110,
          y2: 293,
          offset: 65,
          text: '141 cm (skos dachu)',
        }}
      />

      {/* Total room width along bottom margin */}
      <CadDimensionElement
        data={{
          x1: 495,
          y1: 434,
          x2: 110,
          y2: 434,
          offset: 65,
          text: '385 cm (gabaryt szerokości)',
        }}
      />

      {/* Total room depth along right margin */}
      <CadDimensionElement
        data={{
          x1: 495,
          y1: 110,
          x2: 495,
          y2: 434,
          offset: 65,
          text: '324 cm (gabaryt głębokości)',
        }}
      />
    </g>
  );
}
