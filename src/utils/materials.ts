import {
  CanvasTexture,
  DoubleSide,
  LineBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
} from 'three';

function createTileTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 252, 252);
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

export function createFloorMaterial(widthMeters: number, lengthMeters: number): MeshStandardMaterial {
  const texture = createTileTexture();
  texture.repeat.set(widthMeters * 2, lengthMeters * 2);

  return new MeshStandardMaterial({
    map: texture,
    roughness: 0.3,
    metalness: 0.1,
    side: DoubleSide,
  });
}

export function createWallMaterial(isWireframe: boolean): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.8,
    metalness: 0.05,
    wireframe: isWireframe,
    side: DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
}

export const edgeMaterial = new LineBasicMaterial({
  color: 0x0f172a,
  linewidth: 2,
});
