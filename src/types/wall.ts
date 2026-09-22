export interface Point2D {
  readonly x: number; // cm
  readonly z: number; // cm
}

export interface WallDefinition {
  readonly id: string;
  readonly label: string;
  readonly name: string;
  readonly length: number; // cm
  readonly start: Point2D;
  readonly end: Point2D;
  readonly angleDeg: number;
  readonly height: number; // cm
  readonly startHeight?: number; // cm at start point
  readonly endHeight?: number; // cm at end point
  readonly isDoorway?: boolean;
  readonly doorHeight?: number; // cm
}

export interface CustomRoomModel {
  readonly walls: readonly WallDefinition[];
  readonly defaultHeight: number; // cm
  readonly isClosed: boolean;
}
