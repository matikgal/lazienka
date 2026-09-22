import type { WallDefinition, CustomRoomModel } from '../types/wall';
import { getRoofHeightAtZ } from '../utils/roofProfile';

export const INITIAL_WALLS: readonly WallDefinition[] = [
  { id: 'w1', label: 'A', name: 'Ściana A', length: 242, start: { x: 0, z: 0 }, end: { x: 242, z: 0 }, angleDeg: 0, height: 257.5, startHeight: 257.5, endHeight: 257.5 },
  { id: 'w2', label: 'B', name: 'Ściana B', length: 324, start: { x: 242, z: 0 }, end: { x: 242, z: -324 }, angleDeg: 90, height: 257.5, startHeight: 257.5, endHeight: 123.0 },
  { id: 'w3', label: 'C', name: 'Ściana C (kolankowa)', length: 385, start: { x: 242, z: -324 }, end: { x: -143, z: -324 }, angleDeg: 90, height: 123.0, startHeight: 123.0, endHeight: 123.0 },
  { id: 'w4-1', label: 'D', name: 'Ściana D', length: 89, start: { x: -143, z: -324 }, end: { x: -143, z: -235 }, angleDeg: 90, height: 207.9, startHeight: 123.0, endHeight: getRoofHeightAtZ(-235) },
  { id: 'w4-2', label: 'E', name: 'Ściana E (uskok)', length: 11, start: { x: -143, z: -235 }, end: { x: -132, z: -235 }, angleDeg: 90, height: getRoofHeightAtZ(-235), startHeight: getRoofHeightAtZ(-235), endHeight: getRoofHeightAtZ(-235) },
  { id: 'w4-3', label: 'F', name: 'Ściana F', length: 75.5, start: { x: -132, z: -235 }, end: { x: -132, z: -159.5 }, angleDeg: -90, height: 257.5, startHeight: getRoofHeightAtZ(-235), endHeight: 257.5 },
  { id: 'w4-4', label: 'G', name: 'Ściana G (uskok)', length: 132, start: { x: -132, z: -159.5 }, end: { x: 0, z: -159.5 }, angleDeg: 90, height: 257.5, startHeight: 257.5, endHeight: 257.5 },
  { id: 'w4-5', label: 'H', name: 'Ściana H', length: 50, start: { x: 0, z: -159.5 }, end: { x: 0, z: -109.5 }, angleDeg: -90, height: 257.5, startHeight: 257.5, endHeight: 257.5 },
  { id: 'w4-6', label: 'I', name: 'Drzwi (I)', length: 79, start: { x: 0, z: -109.5 }, end: { x: 0, z: -30.5 }, angleDeg: 0, height: 257.5, startHeight: 257.5, endHeight: 257.5, isDoorway: true, doorHeight: 205 },
  { id: 'w4-7', label: 'J', name: 'Ściana J', length: 30.5, start: { x: 0, z: -30.5 }, end: { x: 0, z: 0 }, angleDeg: 0, height: 257.5, startHeight: 257.5, endHeight: 257.5 },
];

export const INITIAL_ROOM_MODEL: CustomRoomModel = {
  walls: INITIAL_WALLS,
  defaultHeight: 257.5,
  isClosed: true,
};
