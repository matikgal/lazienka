export type CadRotation = 0 | 90 | 180 | 270;

export interface CadTransformState {
  readonly rotation: CadRotation;
  readonly flipH: boolean;
  readonly flipV: boolean;
}

export const DEFAULT_CAD_TRANSFORM: CadTransformState = {
  rotation: 180, // Default 180° rotation to fix vertical/horizontal mirror orientation
  flipH: false,
  flipV: false,
};
