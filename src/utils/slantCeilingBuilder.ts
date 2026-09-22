import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  DoubleSide,
} from 'three';
import type { BoundingBox2D } from './polygonMath';
import { cmToMeters } from './mathHelpers';
import { createTextSprite } from './textSprite';
import { CURRENT_ROOF_CONFIG } from './roofProfile';

export function buildSlantCeilingMesh(
  bbox: BoundingBox2D,
  showCeiling: boolean
): Group {
  const group = new Group();

  const slantZStart = -CURRENT_ROOF_CONFIG.slantStartFromA; // -183 cm
  const slantZEnd = -CURRENT_ROOF_CONFIG.totalRoomDepth; // -324 cm
  const maxH = cmToMeters(CURRENT_ROOF_CONFIG.maxCeilingHeight); // 2.575 m
  const kneeH = cmToMeters(CURRENT_ROOF_CONFIG.kneeWallHeight); // 1.230 m

  const zStartM = cmToMeters(slantZStart - bbox.centerZ);
  const zEndM = cmToMeters(slantZEnd - bbox.centerZ);
  const xMinM = cmToMeters(-143 - bbox.centerX);
  const xMaxM = cmToMeters(242 - bbox.centerX);

  // Reference guide line along the ceiling where slant begins
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute(
    'position',
    new Float32BufferAttribute([xMinM, maxH, zStartM, xMaxM, maxH, zStartM], 3)
  );
  const lineMat = new LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
  group.add(new LineSegments(lineGeo, lineMat));

  const slantBadge = createTextSprite('Początek skosu: 183 cm (h: 257.5 cm)', 0.65, 0.18);
  slantBadge.position.set((xMinM + xMaxM) / 2, maxH + 0.18, zStartM);
  group.add(slantBadge);

  if (showCeiling) {
    // 3D sloping roof plane
    const planeGeo = new BufferGeometry();
    const vertices = new Float32Array([
      xMinM, kneeH, zEndM,
      xMaxM, kneeH, zEndM,
      xMaxM, maxH,  zStartM,

      xMinM, kneeH, zEndM,
      xMaxM, maxH,  zStartM,
      xMinM, maxH,  zStartM,
    ]);
    planeGeo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    planeGeo.computeVertexNormals();

    const planeMat = new MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.7,
      metalness: 0.05,
      side: DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const mesh = new Mesh(planeGeo, planeMat);
    group.add(mesh);
  }

  return group;
}
