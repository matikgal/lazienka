import { useEffect, useRef, useCallback } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Scene, PerspectiveCamera, WebGLRenderer, GridHelper } from 'three';
import type { ViewPreset } from '../types/room';
import { initializeScene } from '../utils/sceneSetup';
import { applyCameraPreset } from '../utils/cameraPresets';

export function useThreeScene(containerRef: React.RefObject<HTMLDivElement | null>) {
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const gridRef = useRef<GridHelper | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scene, camera, renderer, gridHelper } = initializeScene(container);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    gridRef.current = gridHelper;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controlsRef.current = controls;

    container.appendChild(renderer.domElement);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);

  const setPreset = useCallback((preset: ViewPreset) => {
    if (cameraRef.current && controlsRef.current) {
      applyCameraPreset(preset, cameraRef.current, controlsRef.current);
    }
  }, []);

  return { sceneRef, setPreset, gridRef };
}
