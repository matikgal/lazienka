import { useRef, useEffect } from 'react';
import { Group } from 'three';
import type { WallDefinition } from '../../../types/wall';
import type { RenderSettings, ViewPreset } from '../../../types/room';
import type { BoundingBox2D } from '../../../utils/polygonMath';
import { useThreeScene } from '../../../hooks/useThreeScene';
import { buildCustomFloorMesh } from '../../../utils/customFloorBuilder';
import { buildCustomWalls } from '../../../utils/customWallBuilder';
import { buildCustomDimensions } from '../../../utils/customDimensionBuilder';
import { buildSlantCeilingMesh } from '../../../utils/slantCeilingBuilder';
import { buildRoofWindowMesh } from '../../../utils/roofWindowBuilder';

interface RoomCanvasProps {
  readonly walls: readonly WallDefinition[];
  readonly bbox: BoundingBox2D;
  readonly settings: RenderSettings;
  readonly activePreset: ViewPreset;
}

export function RoomCanvas({
  walls,
  bbox,
  settings,
  activePreset,
}: RoomCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { sceneRef, setPreset, gridRef } = useThreeScene(containerRef);
  const roomGroupRef = useRef<Group | null>(null);

  useEffect(() => {
    setPreset(activePreset);
  }, [activePreset, setPreset]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (roomGroupRef.current) {
      scene.remove(roomGroupRef.current);
    }

    const roomGroup = new Group();

    const floor = buildCustomFloorMesh(walls, bbox);
    roomGroup.add(floor);

    const wallMeshes = buildCustomWalls(walls, bbox, settings.showWireframe);
    roomGroup.add(wallMeshes);

    const ceiling = buildSlantCeilingMesh(bbox, settings.showCeiling);
    roomGroup.add(ceiling);

    const roofWindow = buildRoofWindowMesh(bbox);
    roomGroup.add(roofWindow);

    if (settings.showDimensions) {
      const dimensionsMesh = buildCustomDimensions(walls, bbox);
      roomGroup.add(dimensionsMesh);
    }

    scene.add(roomGroup);
    roomGroupRef.current = roomGroup;

    if (gridRef.current) {
      gridRef.current.visible = settings.showGrid;
    }
  }, [walls, bbox, settings, sceneRef, gridRef]);

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      role="region"
      aria-label="Podgląd 3D ścian i skosów łazienki"
      tabIndex={0}
    />
  );
}
