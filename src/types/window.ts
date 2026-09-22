export interface RoofWindowConfig {
  readonly width: number; // 73 cm
  readonly height: number; // 115 cm (along slope)
  readonly distFromLeft: number; // 201 cm from left corner
  readonly distFromRight: number; // 102 cm from right corner
  readonly distFromKneeWall: number; // 33 cm from knee wall along slope/height
  readonly distFromSlantTop: number; // 73 cm from top of slant
}

export const CURRENT_ROOF_WINDOW: RoofWindowConfig = {
  width: 73,
  height: 115,
  distFromLeft: 201,
  distFromRight: 102,
  distFromKneeWall: 33,
  distFromSlantTop: 73,
};
