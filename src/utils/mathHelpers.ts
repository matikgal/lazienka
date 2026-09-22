import type { RoomDimensions, RoomMetrics } from '../types/room';

export function cmToMeters(centimeters: number): number {
  return centimeters / 100;
}

export function formatMeasurement(centimeters: number): string {
  const meters = cmToMeters(centimeters);
  return `${centimeters} cm (${meters.toFixed(2)} m)`;
}

export function calculateRoomMetrics(dimensions: RoomDimensions): RoomMetrics {
  const widthM = cmToMeters(dimensions.width);
  const lengthM = cmToMeters(dimensions.length);
  const heightM = cmToMeters(dimensions.height);

  const floorAreaSquareMeters = Number((widthM * lengthM).toFixed(2));
  const perimeterMeters = Number((2 * (widthM + lengthM)).toFixed(2));

  // Base rectangular surface area of 4 walls
  let wallAreaSquareMeters = 2 * (widthM + lengthM) * heightM;
  let volumeCubicMeters = widthM * lengthM * heightM;

  if (dimensions.slant.enabled) {
    const slantDepthM = cmToMeters(dimensions.slant.slantDepth);
    const slantHeightM = heightM - cmToMeters(dimensions.slant.kneeWallHeight);
    
    // Slant reduces volume by triangular prism along the active wall
    if (slantHeightM > 0 && slantDepthM > 0) {
      const activeLength = dimensions.slant.wallIndex % 2 === 0 ? widthM : lengthM;
      const reductionVolume = 0.5 * slantDepthM * slantHeightM * activeLength;
      volumeCubicMeters = Math.max(0, volumeCubicMeters - reductionVolume);

      // Adjust wall area: gable walls lose triangular segment, knee wall is lower
      wallAreaSquareMeters -= slantDepthM * slantHeightM;
    }
  }

  return {
    floorAreaSquareMeters,
    wallAreaSquareMeters: Number(wallAreaSquareMeters.toFixed(2)),
    volumeCubicMeters: Number(volumeCubicMeters.toFixed(2)),
    perimeterMeters,
  };
}
