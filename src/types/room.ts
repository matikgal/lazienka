export interface SlantConfig {
  readonly enabled: boolean;
  readonly wallIndex: 0 | 1 | 2 | 3;
  readonly kneeWallHeight: number; // cm
  readonly slantDepth: number; // cm
}

export interface RoomDimensions {
  readonly width: number; // cm (X axis)
  readonly length: number; // cm (Z axis)
  readonly height: number; // cm (Y axis)
  readonly slant: SlantConfig;
}

export type ViewPreset = 'perspective' | 'top' | 'isometric' | 'front';

export interface RenderSettings {
  readonly showWireframe: boolean;
  readonly showDimensions: boolean;
  readonly showCeiling: boolean;
  readonly showGrid: boolean;
}

export interface RoomMetrics {
  readonly floorAreaSquareMeters: number;
  readonly wallAreaSquareMeters: number;
  readonly volumeCubicMeters: number;
  readonly perimeterMeters: number;
}
