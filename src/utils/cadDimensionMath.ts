export interface DimensionData {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly offset: number;
  readonly text: string;
  readonly badge?: string;
}

export function computeCadDimensionGeometry(dim: DimensionData) {
  const dx = dim.x2 - dim.x1;
  const dy = dim.y2 - dim.y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return null;

  // Outward normal vector for clockwise contour in SVG screen coordinates
  const vx = dy / len;
  const vy = -dx / len;
  const nx = vx * dim.offset;
  const ny = vy * dim.offset;

  const lx1 = dim.x1 + nx;
  const ly1 = dim.y1 + ny;
  const lx2 = dim.x2 + nx;
  const ly2 = dim.y2 + ny;

  // Midpoint for dimension text
  const midX = (lx1 + lx2) / 2;
  const midY = (ly1 + ly2) / 2;

  // 45 degree architectural tick size
  const tickSize = 4;
  const ux = dx / len;
  const uy = dy / len;

  const tick1 = {
    x1: lx1 - (ux + vx) * tickSize,
    y1: ly1 - (uy + vy) * tickSize,
    x2: lx1 + (ux + vx) * tickSize,
    y2: ly1 + (uy + vy) * tickSize,
  };

  const tick2 = {
    x1: lx2 - (ux + vx) * tickSize,
    y1: ly2 - (uy + vy) * tickSize,
    x2: lx2 + (ux + vx) * tickSize,
    y2: ly2 + (uy + vy) * tickSize,
  };

  let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (angleDeg > 90) angleDeg -= 180;
  if (angleDeg <= -90) angleDeg += 180;

  const textLabel = dim.badge ? `[${dim.badge}] ${dim.text}` : dim.text;
  const maskWidth = Math.max(28, textLabel.length * 6.5 + 8);
  const maskHeight = 13;

  return {
    line: { x1: lx1, y1: ly1, x2: lx2, y2: ly2 },
    witness1: {
      x1: dim.x1 + vx * 2,
      y1: dim.y1 + vy * 2,
      x2: lx1 + vx * 3,
      y2: ly1 + vy * 3,
    },
    witness2: {
      x1: dim.x2 + vx * 2,
      y1: dim.y2 + vy * 2,
      x2: lx2 + vx * 3,
      y2: ly2 + vy * 3,
    },
    tick1,
    tick2,
    textPos: { x: midX, y: midY },
    angleDeg,
    textLabel,
    maskWidth,
    maskHeight,
  };
}
