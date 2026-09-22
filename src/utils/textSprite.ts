import { CanvasTexture, Sprite, SpriteMaterial } from 'three';

export function createTextSprite(
  text: string,
  scaleX = 0.45,
  scaleY = 0.16
): Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 72;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.roundRect(4, 4, 248, 64, 8);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 36);
  }

  const texture = new CanvasTexture(canvas);
  const material = new SpriteMaterial({ map: texture, depthTest: false });
  const sprite = new Sprite(material);
  sprite.scale.set(scaleX, scaleY, 1);
  return sprite;
}
