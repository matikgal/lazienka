export type DisplayMode = '3d' | 'technical';

export interface TechnicalViewConfig {
  readonly showHeights: boolean;
  readonly showRoofBoundary: boolean;
  readonly showGrid: boolean;
  readonly showDoorArc: boolean;
}
