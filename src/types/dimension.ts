import type { Vector3 } from 'three';

export interface DimensionLineConfig {
  readonly start: Vector3;
  readonly end: Vector3;
  readonly label: string;
  readonly normal?: Vector3;
  readonly offset?: number;
}
