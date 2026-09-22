import type { CadRotation, CadTransformState } from '../types/cadTransform';
import { SVG_WIDTH, SVG_HEIGHT } from './technicalMath';

export function transformCadPoint(
  pt: { x: number; y: number },
  transform: CadTransformState
): { x: number; y: number } {
  const cx = SVG_WIDTH / 2;
  const cy = SVG_HEIGHT / 2;

  let dx = pt.x - cx;
  let dy = pt.y - cy;

  if (transform.flipH) dx = -dx;
  if (transform.flipV) dy = -dy;

  let rx = dx;
  let ry = dy;

  switch (transform.rotation) {
    case 90:
      rx = -dy;
      ry = dx;
      break;
    case 180:
      rx = -dx;
      ry = -dy;
      break;
    case 270:
      rx = dy;
      ry = -dx;
      break;
    case 0:
    default:
      break;
  }

  return {
    x: cx + rx,
    y: cy + ry,
  };
}

export function cycleRotation(curr: CadRotation): CadRotation {
  if (curr === 0) return 90;
  if (curr === 90) return 180;
  if (curr === 180) return 270;
  return 0;
}
