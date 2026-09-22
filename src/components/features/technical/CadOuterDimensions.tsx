import type { CadTransformState } from '../../../types/cadTransform';
import { toSvgX, toSvgY } from '../../../utils/technicalMath';
import { transformCadPoint } from '../../../utils/cadTransformMath';
import { CadDimensionElement } from './CadDimensionElement';

interface CadOuterDimensionsProps {
  readonly transform: CadTransformState;
}

export function CadOuterDimensions({ transform }: CadOuterDimensionsProps) {
  const topY = toSvgY(0);
  const slantY = toSvgY(-183);
  const bottomY = toSvgY(-324);
  const rightX = toSvgX(242);
  const leftX = toSvgX(-143);

  const pB1 = transformCadPoint({ x: rightX, y: topY }, transform);
  const pBSlant = transformCadPoint({ x: rightX, y: slantY }, transform);
  const pB2 = transformCadPoint({ x: rightX, y: bottomY }, transform);
  const pD1 = transformCadPoint({ x: leftX, y: bottomY }, transform);
  const pD2 = transformCadPoint({ x: leftX, y: topY }, transform);

  return (
    <g className="cad-outer-dimensions">
      <CadDimensionElement
        data={{
          x1: pB1.x,
          y1: pB1.y,
          x2: pBSlant.x,
          y2: pBSlant.y,
          offset: 58,
          text: '183 cm (płaski sufit)',
        }}
      />
      <CadDimensionElement
        data={{
          x1: pBSlant.x,
          y1: pBSlant.y,
          x2: pB2.x,
          y2: pB2.y,
          offset: 58,
          text: '141 cm (skos dachu)',
        }}
      />
      <CadDimensionElement
        data={{
          x1: pD1.x,
          y1: pD1.y,
          x2: pD2.x,
          y2: pD2.y,
          offset: 58,
          text: '324 cm (gabaryt głębokości)',
        }}
      />
      <CadDimensionElement
        data={{
          x1: pB2.x,
          y1: pB2.y,
          x2: pD1.x,
          y2: pD1.y,
          offset: 58,
          text: '385 cm (gabaryt szerokości)',
        }}
      />
    </g>
  );
}
