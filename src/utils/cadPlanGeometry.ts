export interface CadPlanPoint {
  readonly x: number;
  readonly y: number;
}

export interface CadPlanWall {
  readonly id: string;
  readonly label: string;
  readonly name: string;
  readonly length: number;
  readonly isDoorway?: boolean;
  readonly p1: CadPlanPoint;
  readonly p2: CadPlanPoint;
  readonly offset: number;
}

export const CAD_PLAN_LAYOUT = {
  svgWidth: 630,
  svgHeight: 560,
  slantY: 293, // 110 + 183 cm from Wall A
  wallCY: 434, // 110 + 324 cm
  wallBX: 110,
  wallDX: 495, // 110 + 385 cm
};

export const CAD_PLAN_WALLS: readonly CadPlanWall[] = [
  { id: 'w1', label: 'A', name: 'Ściana A', length: 242, p1: { x: 110, y: 110 }, p2: { x: 352, y: 110 }, offset: 32 },
  { id: 'w4-7', label: 'J', name: 'Ściana J', length: 30.5, p1: { x: 352, y: 110 }, p2: { x: 352, y: 140.5 }, offset: 28 },
  { id: 'w4-6', label: 'I', name: 'Drzwi (I)', length: 79, isDoorway: true, p1: { x: 352, y: 140.5 }, p2: { x: 352, y: 219.5 }, offset: 28 },
  { id: 'w4-5', label: 'H', name: 'Ściana H', length: 50, p1: { x: 352, y: 219.5 }, p2: { x: 352, y: 269.5 }, offset: 28 },
  { id: 'w4-4', label: 'G', name: 'Ściana G (uskok)', length: 132, p1: { x: 352, y: 269.5 }, p2: { x: 484, y: 269.5 }, offset: 24 },
  { id: 'w4-3', label: 'F', name: 'Ściana F', length: 75.5, p1: { x: 484, y: 269.5 }, p2: { x: 484, y: 345 }, offset: 26 },
  { id: 'w4-2', label: 'E', name: 'Ściana E (uskok)', length: 11, p1: { x: 484, y: 345 }, p2: { x: 495, y: 345 }, offset: 18 },
  { id: 'w4-1', label: 'D', name: 'Ściana D', length: 89, p1: { x: 495, y: 345 }, p2: { x: 495, y: 434 }, offset: 32 },
  { id: 'w3', label: 'C', name: 'Ściana C (kolankowa)', length: 385, p1: { x: 495, y: 434 }, p2: { x: 110, y: 434 }, offset: 32 },
  { id: 'w2', label: 'B', name: 'Ściana B', length: 324, p1: { x: 110, y: 434 }, p2: { x: 110, y: 110 }, offset: 32 },
];
