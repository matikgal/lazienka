import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  Shape,
  ShapeGeometry,
} from 'three';
import type { WallDefinition } from '../types/wall';
import type { BoundingBox2D } from './polygonMath';
import { centerPoint } from './polygonMath';
import { cmToMeters } from './mathHelpers';
import { createFloorMaterial } from './materials';

export function buildCustomFloorMesh(
  walls: readonly WallDefinition[],
  bbox: BoundingBox2D
): Group {
  const group = new Group();
  if (walls.length < 3) return group;

  // Extract vertices in continuous perimeter order
  const rawPoints = walls.map((w) => centerPoint(w.start, bbox));

  // Filter out collinear intermediate points along straight walls
  const cleanCorners: typeof rawPoints = [];
  for (let i = 0; i < rawPoints.length; i++) {
    const prev = rawPoints[(i - 1 + rawPoints.length) % rawPoints.length];
    const curr = rawPoints[i];
    const next = rawPoints[(i + 1) % rawPoints.length];

    const dx1 = curr.x - prev.x;
    const dz1 = curr.z - prev.z;
    const dx2 = next.x - curr.x;
    const dz2 = next.z - curr.z;

    const cross = dx1 * dz2 - dz1 * dx2;
    if (Math.abs(cross) > 0.01) {
      cleanCorners.push(curr);
    }
  }

  const shape = new Shape();
  shape.moveTo(cmToMeters(cleanCorners[0].x), cmToMeters(cleanCorners[0].z));
  for (let i = 1; i < cleanCorners.length; i++) {
    shape.lineTo(cmToMeters(cleanCorners[i].x), cmToMeters(cleanCorners[i].z));
  }
  shape.closePath();

  const geometry = new ShapeGeometry(shape);
  // Rotate around X by +PI/2 so 2D (x, y) maps directly to 3D ground plane (x, 0, z)
  geometry.rotateX(Math.PI / 2);

  const material = createFloorMaterial(cmToMeters(bbox.width), cmToMeters(bbox.depth));
  const floorMesh = new Mesh(geometry, material);
  floorMesh.receiveShadow = true;
  group.add(floorMesh);

  // Crisp perimeter outline along floor edges
  const outlineCoords: number[] = [];
  cleanCorners.forEach((pt) => {
    outlineCoords.push(cmToMeters(pt.x), 0.005, cmToMeters(pt.z));
  });

  const outlineGeo = new BufferGeometry();
  outlineGeo.setAttribute('position', new Float32BufferAttribute(outlineCoords, 3));
  const outlineMat = new LineBasicMaterial({ color: 0x0284c7, linewidth: 3 });
  const outlineLine = new LineLoop(outlineGeo, outlineMat);
  group.add(outlineLine);

  return group;
}
