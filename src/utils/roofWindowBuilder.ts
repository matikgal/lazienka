import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  DoubleSide,
} from 'three';
import type { BoundingBox2D } from './polygonMath';
import { computeRoofWindowPlacement } from './roofWindowMath';
import { createTextSprite } from './textSprite';
import { edgeMaterial } from './materials';

export function buildRoofWindowMesh(bbox: BoundingBox2D): Group {
  const group = new Group();
  const data = computeRoofWindowPlacement(bbox);

  const windowGroup = new Group();
  windowGroup.position.set(data.positionM.x, data.positionM.y, data.positionM.z);
  windowGroup.rotation.x = data.pitchRad;

  // Window frame (outer rim)
  const frameMat = new MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.5 });
  const frameThickness = 0.06;
  const w = data.widthM;
  const h = data.heightM;

  // 4 sides of the window frame
  const topBottomGeo = new BoxGeometry(w, frameThickness, 0.08);
  const leftRightGeo = new BoxGeometry(frameThickness, h, 0.08);

  const topMesh = new Mesh(topBottomGeo, frameMat);
  topMesh.position.set(0, h / 2, 0);
  const bottomMesh = new Mesh(topBottomGeo, frameMat);
  bottomMesh.position.set(0, -h / 2, 0);

  const leftMesh = new Mesh(leftRightGeo, frameMat);
  leftMesh.position.set(-w / 2, 0, 0);
  const rightMesh = new Mesh(leftRightGeo, frameMat);
  rightMesh.position.set(w / 2, 0, 0);

  windowGroup.add(topMesh, bottomMesh, leftMesh, rightMesh);

  // Glass pane
  const glassGeo = new PlaneGeometry(w - frameThickness, h - frameThickness);
  const glassMat = new MeshStandardMaterial({
    color: 0x93c5fd,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.55,
    side: DoubleSide,
  });
  const glassMesh = new Mesh(glassGeo, glassMat);
  windowGroup.add(glassMesh);

  // Outlines
  [topMesh, bottomMesh, leftMesh, rightMesh].forEach((m) => {
    windowGroup.add(new LineSegments(new EdgesGeometry(m.geometry), edgeMaterial));
  });

  group.add(windowGroup);

  // Dimension badge floating above window
  const labelSprite = createTextSprite('Okno dachowe: 73 × 115 cm', 0.65, 0.18);
  labelSprite.position.set(data.positionM.x, data.positionM.y + 0.35, data.positionM.z);
  group.add(labelSprite);

  return group;
}
