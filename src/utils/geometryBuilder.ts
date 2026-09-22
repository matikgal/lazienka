import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineSegments,
  Mesh,
  PlaneGeometry,
} from 'three';
import type { RoomDimensions, RenderSettings } from '../types/room';
import { cmToMeters } from './mathHelpers';
import { createFloorMaterial, createWallMaterial, edgeMaterial } from './materials';

export function buildFloorMesh(widthM: number, lengthM: number): Mesh {
  const geometry = new PlaneGeometry(widthM, lengthM);
  geometry.rotateX(-Math.PI / 2);
  const material = createFloorMaterial(widthM, lengthM);
  const mesh = new Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
}

export function buildWallWithSlant(
  widthM: number,
  lengthM: number,
  heightM: number,
  dimensions: RoomDimensions,
  settings: RenderSettings
): Group {
  const group = new Group();
  const wallMat = createWallMaterial(settings.showWireframe);

  const halfW = widthM / 2;
  const halfL = lengthM / 2;
  const wallThickness = 0.08;

  // South Wall (Z = +halfL)
  const southGeo = new BoxGeometry(widthM, heightM, wallThickness);
  southGeo.translate(0, heightM / 2, halfL);
  const southMesh = new Mesh(southGeo, wallMat);
  group.add(southMesh);

  // North Wall (Z = -halfL) - can have knee wall if slant enabled on wall 2
  if (dimensions.slant.enabled && dimensions.slant.wallIndex === 2) {
    const kneeH = cmToMeters(dimensions.slant.kneeWallHeight);
    const kneeGeo = new BoxGeometry(widthM, kneeH, wallThickness);
    kneeGeo.translate(0, kneeH / 2, -halfL);
    group.add(new Mesh(kneeGeo, wallMat));
  } else {
    const northGeo = new BoxGeometry(widthM, heightM, wallThickness);
    northGeo.translate(0, heightM / 2, -halfL);
    group.add(new Mesh(northGeo, wallMat));
  }

  // East Wall (X = +halfW) and West Wall (X = -halfW)
  const sideGeo = new BoxGeometry(wallThickness, heightM, lengthM);
  const eastGeo = sideGeo.clone().translate(halfW, heightM / 2, 0);
  const westGeo = sideGeo.clone().translate(-halfW, heightM / 2, 0);

  group.add(new Mesh(eastGeo, wallMat));
  group.add(new Mesh(westGeo, wallMat));

  // Crisp outlines for architectural visibility
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      const edges = new EdgesGeometry(child.geometry);
      const line = new LineSegments(edges, edgeMaterial);
      group.add(line);
    }
  });

  return group;
}
