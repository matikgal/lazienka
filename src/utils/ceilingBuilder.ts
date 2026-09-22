import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
} from 'three';
import type { RoomDimensions, RenderSettings } from '../types/room';
import { cmToMeters } from './mathHelpers';
import { createWallMaterial } from './materials';

export function buildSlantedCeilingMesh(
  dimensions: RoomDimensions,
  settings: RenderSettings
): Group {
  const group = new Group();
  if (!settings.showCeiling || !dimensions.slant.enabled) return group;

  const w = cmToMeters(dimensions.width);
  const l = cmToMeters(dimensions.length);
  const h = cmToMeters(dimensions.height);
  const kneeH = cmToMeters(dimensions.slant.kneeWallHeight);
  const slantDepth = cmToMeters(dimensions.slant.slantDepth);

  const halfW = w / 2;
  const halfL = l / 2;

  // Triangular slant plane connecting knee wall to ceiling level
  const geo = new BufferGeometry();
  const zKnee = -halfL;
  const zCeil = -halfL + slantDepth;

  const vertices = new Float32Array([
    -halfW, kneeH, zKnee,
     halfW, kneeH, zKnee,
     halfW, h, zCeil,

    -halfW, kneeH, zKnee,
     halfW, h, zCeil,
    -halfW, h, zCeil,
  ]);

  geo.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  geo.computeVertexNormals();

  const mat = createWallMaterial(settings.showWireframe);
  const mesh = new Mesh(geo, mat);
  group.add(mesh);

  return group;
}
