export interface RoofWindowConfig {
  readonly width: number; // 73 cm
  readonly height: number; // 115 cm (along slope)
  readonly distFromWallB: number; // 100 cm from Wall B (1.00 m)
  readonly distFromWallD: number; // 212 cm from Wall D (385 - 100 - 73)
  readonly distFromLeft: number; // 212 cm from Wall D in 3D (-143 to 242)
  readonly distFromRight: number; // 100 cm from Wall B in 3D
  readonly distFromKneeWall: number; // 33 cm from knee wall C
  readonly distFromSlantTop: number; // 73 cm from top of slant
}

export const CURRENT_ROOF_WINDOW: RoofWindowConfig = {
  width: 73,
  height: 115,
  distFromWallB: 100,
  distFromWallD: 212,
  distFromLeft: 212,
  distFromRight: 100,
  distFromKneeWall: 33,
  distFromSlantTop: 73,
};
