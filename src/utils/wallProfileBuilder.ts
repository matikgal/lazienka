import { BoxGeometry, ExtrudeGeometry, Shape } from 'three';
import type { WallDefinition } from '../types/wall';
import { getRoofHeightAtZ, CURRENT_ROOF_CONFIG } from './roofProfile';
import { cmToMeters } from './mathHelpers';

export function buildPiecewiseWallGeometry(
  wall: WallDefinition,
  lengthM: number,
  thicknessM: number
): ExtrudeGeometry | BoxGeometry {
  const sZ = wall.start.z;
  const eZ = wall.end.z;
  const slantZ = -CURRENT_ROOF_CONFIG.slantStartFromA; // -183 cm

  const sH = cmToMeters(getRoofHeightAtZ(sZ));
  const eH = cmToMeters(getRoofHeightAtZ(eZ));
  const crosses = (sZ - slantZ) * (eZ - slantZ) < -0.01;

  // Fully flat wall outside or inside the slant with uniform height
  if (!crosses && Math.abs(sH - eH) < 0.005) {
    const geo = new BoxGeometry(lengthM, sH, thicknessM);
    geo.translate(0, sH / 2, 0);
    return geo;
  }

  const shape = new Shape();
  shape.moveTo(0, 0);
  shape.lineTo(lengthM, 0);

  if (crosses) {
    // Wall intersects the slant boundary line z = -183 cm
    const t = (slantZ - sZ) / (eZ - sZ);
    const breakDistM = t * lengthM;
    const maxHM = cmToMeters(CURRENT_ROOF_CONFIG.maxCeilingHeight);

    shape.lineTo(lengthM, eH);
    shape.lineTo(breakDistM, maxHM);
    shape.lineTo(0, sH);
  } else {
    shape.lineTo(lengthM, eH);
    shape.lineTo(0, sH);
  }

  shape.closePath();

  const geo = new ExtrudeGeometry(shape, { depth: thicknessM, bevelEnabled: false });
  geo.translate(-lengthM / 2, 0, -thicknessM / 2);
  return geo;
}
