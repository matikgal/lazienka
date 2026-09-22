import { useState, useCallback, useMemo } from 'react';
import type { CustomRoomModel } from '../types/wall';
import type { RenderSettings } from '../types/room';
import { INITIAL_ROOM_MODEL } from '../data/roomData';
import { computeBoundingBox, calculateGapDistance } from '../utils/polygonMath';

const DEFAULT_SETTINGS: RenderSettings = {
  showWireframe: false,
  showDimensions: true,
  showCeiling: false,
  showGrid: true,
};

export function useCustomRoom() {
  const [model, setModel] = useState<CustomRoomModel>(INITIAL_ROOM_MODEL);
  const [settings, setSettings] = useState<RenderSettings>(DEFAULT_SETTINGS);

  const bbox = useMemo(() => computeBoundingBox(model.walls), [model.walls]);
  const gapDistance = useMemo(() => calculateGapDistance(model.walls), [model.walls]);

  const updateWallHeight = useCallback((height: number) => {
    setModel((prev) => ({
      ...prev,
      defaultHeight: height,
      walls: prev.walls.map((w) => ({ ...w, height })),
    }));
  }, []);

  const toggleSetting = useCallback((key: keyof RenderSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const totalLength = useMemo(() => {
    return model.walls.reduce((acc, w) => acc + w.length, 0);
  }, [model.walls]);

  return {
    model,
    bbox,
    gapDistance,
    totalLength,
    settings,
    updateWallHeight,
    toggleSetting,
  };
}
