import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineSegments,
  Mesh,
} from 'three';
import type { WallDefinition } from '../types/wall';
import type { BoundingBox2D } from './polygonMath';
import { centerPoint } from './polygonMath';
import { cmToMeters } from './mathHelpers';
import { createWallMaterial, edgeMaterial } from './materials';
import { buildPiecewiseWallGeometry } from './wallProfileBuilder';

export function buildCustomWalls(
  walls: readonly WallDefinition[],
  bbox: BoundingBox2D,
  isWireframe: boolean
): Group {
  const group = new Group();
  const wallMat = createWallMaterial(isWireframe);
  const thicknessM = 0.10;

  walls.forEach((wall) => {
    const s = centerPoint(wall.start, bbox);
    const e = centerPoint(wall.end, bbox);
    const sM = { x: cmToMeters(s.x), z: cmToMeters(s.z) };
    const eM = { x: cmToMeters(e.x), z: cmToMeters(e.z) };

    const dx = eM.x - sM.x;
    const dz = eM.z - sM.z;
    const lengthM = Math.hypot(dx, dz);
    const sHM = cmToMeters(wall.startHeight ?? wall.height);
    const angle = Math.atan2(dz, dx);

    if (wall.isDoorway) {
      const doorHM = cmToMeters(wall.doorHeight ?? 205);
      const lintelHM = Math.max(0.1, sHM - doorHM);
      const lintelGeo = new BoxGeometry(lengthM, lintelHM, thicknessM);
      const lintelMesh = new Mesh(lintelGeo, wallMat);
      lintelMesh.position.set((sM.x + eM.x) / 2, doorHM + lintelHM / 2, (sM.z + eM.z) / 2);
      lintelMesh.rotation.y = -angle;
      group.add(lintelMesh);
      group.add(new LineSegments(new EdgesGeometry(lintelGeo), edgeMaterial));
    } else {
      const geo = buildPiecewiseWallGeometry(wall, lengthM, thicknessM);
      const mesh = new Mesh(geo, wallMat);
      mesh.position.set((sM.x + eM.x) / 2, 0, (sM.z + eM.z) / 2);
      mesh.rotation.y = -angle;
      group.add(mesh);
      const lines = new LineSegments(new EdgesGeometry(geo), edgeMaterial);
      lines.position.copy(mesh.position);
      lines.rotation.copy(mesh.rotation);
      group.add(lines);
    }

    const cornerHM = sHM;
    const cornerGeo = new BoxGeometry(thicknessM, cornerHM, thicknessM);
    const cornerMesh = new Mesh(cornerGeo, wallMat);
    cornerMesh.position.set(sM.x, cornerHM / 2, sM.z);
    group.add(cornerMesh);
    const cornerLines = new LineSegments(new EdgesGeometry(cornerGeo), edgeMaterial);
    cornerLines.position.copy(cornerMesh.position);
    group.add(cornerLines);
  });

  return group;
}
