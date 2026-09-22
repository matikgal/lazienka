import type { WallDefinition, Point2D } from '../types/wall';

export interface BoundingBox2D {
  readonly minX: number;
  readonly maxX: number;
  readonly minZ: number;
  readonly maxZ: number;
  readonly centerX: number;
  readonly centerZ: number;
  readonly width: number;
  readonly depth: number;
}

export function computeBoundingBox(walls: readonly WallDefinition[]): BoundingBox2D {
  if (walls.length === 0) {
    return { minX: 0, maxX: 0, minZ: 0, maxZ: 0, centerX: 0, centerZ: 0, width: 0, depth: 0 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  walls.forEach((w) => {
    minX = Math.min(minX, w.start.x, w.end.x);
    maxX = Math.max(maxX, w.start.x, w.end.x);
    minZ = Math.min(minZ, w.start.z, w.end.z);
    maxZ = Math.max(maxZ, w.start.z, w.end.z);
  });

  const width = maxX - minX;
  const depth = maxZ - minZ;
  const centerX = minX + width / 2;
  const centerZ = minZ + depth / 2;

  return { minX, maxX, minZ, maxZ, centerX, centerZ, width, depth };
}

export function centerPoint(p: Point2D, bbox: BoundingBox2D): Point2D {
  return {
    x: p.x - bbox.centerX,
    z: p.z - bbox.centerZ,
  };
}

export function calculateGapDistance(walls: readonly WallDefinition[]): number {
  if (walls.length < 2) return 0;
  const first = walls[0].start;
  const last = walls[walls.length - 1].end;
  const dx = last.x - first.x;
  const dz = last.z - first.z;
  return Math.round(Math.hypot(dx, dz));
}
