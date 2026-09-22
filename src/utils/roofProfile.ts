export interface RoofConfig {
  readonly maxCeilingHeight: number; // 257.5 cm (Ściana A)
  readonly kneeWallHeight: number; // 123.0 cm (Ściana C)
  readonly slantStartFromA: number; // 183.0 cm from Ściana A
  readonly totalRoomDepth: number; // 324.0 cm (Ściana B)
}

export const CURRENT_ROOF_CONFIG: RoofConfig = {
  maxCeilingHeight: 257.5,
  kneeWallHeight: 123.0,
  slantStartFromA: 183.0,
  totalRoomDepth: 324.0,
};

export function getRoofHeightAtZ(zCm: number, config = CURRENT_ROOF_CONFIG): number {
  const distFromA = -zCm; // z=0 at wall A, z=-324 at wall C
  if (distFromA <= config.slantStartFromA) {
    return config.maxCeilingHeight;
  }
  const slantRun = config.totalRoomDepth - config.slantStartFromA; // 141 cm
  const slantDrop = config.maxCeilingHeight - config.kneeWallHeight; // 134.5 cm
  const progress = Math.min(1, Math.max(0, (distFromA - config.slantStartFromA) / slantRun));
  return Number((config.maxCeilingHeight - progress * slantDrop).toFixed(1));
}

export function getRoofSlopeDegrees(config = CURRENT_ROOF_CONFIG): number {
  const slantRun = config.totalRoomDepth - config.slantStartFromA;
  const slantDrop = config.maxCeilingHeight - config.kneeWallHeight;
  const radians = Math.atan2(slantDrop, slantRun);
  return Number(((radians * 180) / Math.PI).toFixed(1));
}
