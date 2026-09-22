import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
} from 'three';
import type { RoomDimensions } from '../types/room';
import { cmToMeters } from './mathHelpers';
import { createTextSprite } from './textSprite';

export function buildDimensionIndicators(dim: RoomDimensions): Group {
  const group = new Group();
  const w = cmToMeters(dim.width);
  const l = cmToMeters(dim.length);
  const h = cmToMeters(dim.height);
  const halfW = w / 2;
  const halfL = l / 2;
  const offset = 0.35;

  const lineMat = new LineBasicMaterial({ color: 0x0284c7, linewidth: 2 });

  // Width dimension (front, along X)
  const widthLineGeo = new BufferGeometry();
  widthLineGeo.setAttribute(
    'position',
    new Float32BufferAttribute(
      [
        -halfW, 0.05, halfL + offset,
         halfW, 0.05, halfL + offset,
        -halfW, 0.05, halfL + offset - 0.1,
        -halfW, 0.05, halfL + offset + 0.1,
         halfW, 0.05, halfL + offset - 0.1,
         halfW, 0.05, halfL + offset + 0.1,
      ],
      3
    )
  );
  group.add(new LineSegments(widthLineGeo, lineMat));
  const widthSprite = createTextSprite(`${dim.width} cm`);
  widthSprite.position.set(0, 0.2, halfL + offset);
  group.add(widthSprite);

  // Length dimension (side, along Z)
  const lengthLineGeo = new BufferGeometry();
  lengthLineGeo.setAttribute(
    'position',
    new Float32BufferAttribute(
      [
        halfW + offset, 0.05, -halfL,
        halfW + offset, 0.05,  halfL,
        halfW + offset - 0.1, 0.05, -halfL,
        halfW + offset + 0.1, 0.05, -halfL,
        halfW + offset - 0.1, 0.05,  halfL,
        halfW + offset + 0.1, 0.05,  halfL,
      ],
      3
    )
  );
  group.add(new LineSegments(lengthLineGeo, lineMat));
  const lengthSprite = createTextSprite(`${dim.length} cm`);
  lengthSprite.position.set(halfW + offset, 0.2, 0);
  group.add(lengthSprite);

  // Height dimension (vertical corner, along Y)
  const heightLineGeo = new BufferGeometry();
  heightLineGeo.setAttribute(
    'position',
    new Float32BufferAttribute(
      [
        -halfW - offset, 0, halfL,
        -halfW - offset, h, halfL,
        -halfW - offset - 0.1, 0, halfL,
        -halfW - offset + 0.1, 0, halfL,
        -halfW - offset - 0.1, h, halfL,
        -halfW - offset + 0.1, h, halfL,
      ],
      3
    )
  );
  group.add(new LineSegments(heightLineGeo, lineMat));
  const heightSprite = createTextSprite(`${dim.height} cm`);
  heightSprite.position.set(-halfW - offset, h / 2, halfL);
  group.add(heightSprite);

  return group;
}
