import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
} from 'three';
import type { WallDefinition } from '../types/wall';
import type { BoundingBox2D } from './polygonMath';
import { centerPoint } from './polygonMath';
import { cmToMeters } from './mathHelpers';
import { createTextSprite } from './textSprite';

export function buildCustomDimensions(
  walls: readonly WallDefinition[],
  bbox: BoundingBox2D
): Group {
  const group = new Group();
  const lineMat = new LineBasicMaterial({ color: 0x0284c7, linewidth: 2 });
  const tickMat = new LineBasicMaterial({ color: 0x38bdf8, linewidth: 1.5 });

  walls.forEach((wall) => {
    const s = centerPoint(wall.start, bbox);
    const e = centerPoint(wall.end, bbox);
    const sM = { x: cmToMeters(s.x), z: cmToMeters(s.z) };
    const eM = { x: cmToMeters(e.x), z: cmToMeters(e.z) };

    const dx = eM.x - sM.x;
    const dz = eM.z - sM.z;
    const lengthM = Math.hypot(dx, dz);
    if (lengthM === 0) return;

    // Normal pointing outside
    const nx = (-dz / lengthM) * 0.40;
    const nz = (dx / lengthM) * 0.40;

    // Adaptive scale & text to prevent collisions on tight nooks
    const isShort = wall.length < 50;
    const isTiny = wall.length < 20;
    const scaleX = isTiny ? 0.35 : isShort ? 0.42 : 0.56;
    const scaleY = isTiny ? 0.15 : 0.16;
    const label = wall.isDoorway
      ? `[${wall.label}] Drzwi ${wall.length} cm`
      : `[${wall.label}] ${wall.length} cm`;

    // Elevate short segments vertically so they never collide with perpendicular neighbors
    const yElevation = isTiny ? 0.55 : isShort ? 0.38 : 0.20;

    // Dimension guide line
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute(
      'position',
      new Float32BufferAttribute(
        [
          sM.x + nx, 0.05, sM.z + nz,
          eM.x + nx, 0.05, eM.z + nz,
          sM.x + nx - nx * 0.25, 0.05, sM.z + nz - nz * 0.25,
          sM.x + nx + nx * 0.25, 0.05, sM.z + nz + nz * 0.25,
          eM.x + nx - nx * 0.25, 0.05, eM.z + nz - nz * 0.25,
          eM.x + nx + nx * 0.25, 0.05, eM.z + nz + nz * 0.25,
        ],
        3
      )
    );
    group.add(new LineSegments(lineGeo, lineMat));

    // Vertical leader tick if elevated
    if (yElevation > 0.25) {
      const leaderGeo = new BufferGeometry();
      const midX = (sM.x + eM.x) / 2 + nx;
      const midZ = (sM.z + eM.z) / 2 + nz;
      leaderGeo.setAttribute(
        'position',
        new Float32BufferAttribute([midX, 0.05, midZ, midX, yElevation, midZ], 3)
      );
      group.add(new LineSegments(leaderGeo, tickMat));
    }

    const sprite = createTextSprite(label, scaleX, scaleY);
    sprite.position.set(
      (sM.x + eM.x) / 2 + nx * 1.15,
      yElevation,
      (sM.z + eM.z) / 2 + nz * 1.15
    );
    group.add(sprite);
  });

  return group;
}
