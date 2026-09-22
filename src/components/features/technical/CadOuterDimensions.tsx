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
          offset: 55,
          text: '183 cm',
        }}
      />
      <CadDimensionElement
        data={{
          x1: 110,
          y1: 434,
          x2: 110,
          y2: 293,
          offset: 55,
          text: '141 cm',
        }}
      />

      {/* Window position breakdown along bottom margin (Wall C) */}
      <CadDimensionElement
        data={{
          x1: 210,
          y1: 434,
          x2: 110,
          y2: 434,
          offset: 55,
          text: '100 cm',
        }}
      />
      <CadDimensionElement
        data={{
          x1: 283,
          y1: 434,
          x2: 210,
          y2: 434,
          offset: 55,
          text: '73 cm',
        }}
      />
      <CadDimensionElement
        data={{
          x1: 495,
          y1: 434,
          x2: 283,
          y2: 434,
          offset: 55,
          text: '212 cm',
        }}
      />

      {/* Total room width along bottom margin */}
      <CadDimensionElement
        data={{
          x1: 495,
          y1: 434,
          x2: 110,
          y2: 434,
          offset: 82,
          text: '385 cm',
        }}
      />

      {/* Total room depth along right margin */}
      <CadDimensionElement
        data={{
          x1: 495,
          y1: 110,
          x2: 495,
          y2: 434,
          offset: 55,
          text: '324 cm',
        }}
      />
    </g>
  );
}
