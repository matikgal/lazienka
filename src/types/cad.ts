export type CadViewType = 'plan' | 'section' | 'full';

export interface CadDimensionsConfig {
  readonly scale: number;
  readonly showGrid: boolean;
  readonly showAngles: boolean;
}
