import { PerspectiveCamera, Vector3 } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ViewPreset } from '../types/room';

export function applyCameraPreset(
  preset: ViewPreset,
  camera: PerspectiveCamera,
  controls: OrbitControls,
  target = new Vector3(0, 0, 0)
): void {
  controls.target.copy(target);

  switch (preset) {
    case 'top':
      // Top-down 2D floor plan view
      camera.position.set(0, 8.5, 0.001);
      break;
    case 'isometric':
      // High isometric view revealing all walls and alcoves
      camera.position.set(-4.5, 5.5, 5.5);
      break;
    case 'front':
      camera.position.set(0, 1.5, 6.5);
      break;
    case 'perspective':
    default:
      // Elevated perspective looking down into the custom room
      camera.position.set(-3.2, 5.2, 4.8);
      break;
  }

  camera.lookAt(target);
  controls.update();
}
