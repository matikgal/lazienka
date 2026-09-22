import { useState, useMemo, useCallback } from 'react';
import type { RoomDimensions, RenderSettings, SlantConfig } from '../types/room';
import { calculateRoomMetrics } from '../utils/mathHelpers';

const INITIAL_DIMENSIONS: RoomDimensions = {
  width: 240, // 2.40 m
  length: 300, // 3.00 m
  height: 250, // 2.50 m
  slant: {
    enabled: false,
    wallIndex: 2, // North wall
    kneeWallHeight: 110, // 1.10 m
    slantDepth: 120, // 1.20 m
  },
};

const INITIAL_SETTINGS: RenderSettings = {
  showWireframe: false,
  showDimensions: true,
  showCeiling: false,
  showGrid: true,
};

export function useRoomDimensions() {
  const [dimensions, setDimensions] = useState<RoomDimensions>(INITIAL_DIMENSIONS);
  const [settings, setSettings] = useState<RenderSettings>(INITIAL_SETTINGS);

  const updateDimension = useCallback((key: 'width' | 'length' | 'height', value: number) => {
    setDimensions((prev) => ({
      ...prev,
      [key]: Math.max(50, Math.min(1000, value)),
    }));
  }, []);

  const updateSlant = useCallback((partial: Partial<SlantConfig>) => {
    setDimensions((prev) => ({
      ...prev,
      slant: { ...prev.slant, ...partial },
    }));
  }, []);

  const toggleSetting = useCallback((key: keyof RenderSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const metrics = useMemo(() => calculateRoomMetrics(dimensions), [dimensions]);

  return {
    dimensions,
    settings,
    metrics,
    updateDimension,
    updateSlant,
    toggleSetting,
  };
}
