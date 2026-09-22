import type { BoundingBox2D } from './polygonMath';
import { CURRENT_ROOF_WINDOW } from '../types/window';
import { cmToMeters } from './mathHelpers';

export function computeRoofWindowPlacement(bbox: BoundingBox2D) {
  const win = CURRENT_ROOF_WINDOW;
  const slopeRun = 141.0;
  const slopeDrop = 134.5;
  const slopeLength = Math.hypot(slopeRun, slopeDrop); // 194.88 cm
  const pitchRad = Math.atan2(slopeDrop, slopeRun);

  // X coordinate in room space (-143 to 242)
  const roomXCenter = -143 + win.distFromLeft + win.width / 2; // 94.5 cm
  const centeredX = roomXCenter - bbox.centerX;

  // Position along slope from top (-183 cm)
  const sCenter = win.distFromSlantTop + win.height / 2; // 130.5 cm
  const ratio = sCenter / slopeLength;

  const roomZCenter = -183 - ratio * slopeRun; // -277.4 cm
  const roomYCenter = 257.5 - ratio * slopeDrop; // 167.4 cm
  const centeredZ = roomZCenter - bbox.centerZ;

  return {
    positionM: {
      x: cmToMeters(centeredX),
      y: cmToMeters(roomYCenter),
      z: cmToMeters(centeredZ),
    },
    widthM: cmToMeters(win.width),
    heightM: cmToMeters(win.height),
    pitchRad,
  };
}
