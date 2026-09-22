import {
  AmbientLight,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export interface SceneContext {
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;
  readonly gridHelper: GridHelper;
}

export function initializeScene(container: HTMLDivElement): SceneContext {
  const scene = new Scene();
  scene.background = new Color(0x1a1d24);

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 600;

  const camera = new PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(5, 4, 6);

  const renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new AmbientLight(0xffffff, 0.75);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xfff5e6, 1.2);
  directionalLight.position.set(6, 10, 7);
  scene.add(directionalLight);

  const fillLight = new DirectionalLight(0xddeeff, 0.5);
  fillLight.position.set(-6, 5, -5);
  scene.add(fillLight);

  const gridHelper = new GridHelper(15, 30, 0x4f46e5, 0x334155);
  gridHelper.position.y = 0;
  scene.add(gridHelper);

  return { scene, camera, renderer, gridHelper };
}
