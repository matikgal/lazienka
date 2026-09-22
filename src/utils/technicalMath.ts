import type { Point2D } from '../types/wall';

export const SVG_MARGIN = 120;
export const SVG_WIDTH = 385 + SVG_MARGIN * 2; // 625
export const SVG_HEIGHT = 324 + SVG_MARGIN * 2; // 564

export function toSvgX(xCm: number): number {
  return xCm + 143 + SVG_MARGIN;
}

export function toSvgY(zCm: number): number {
  // Invert Z so Wall A (z=0) is at the bottom and Wall C (z=-324) is at the top
  return -zCm + SVG_MARGIN;
}

export function toSvgPoint(pt: Point2D): { x: number; y: number } {
  return {
    x: toSvgX(pt.x),
    y: toSvgY(pt.z),
  };
}

export function formatHeightRange(startH?: number, endH?: number, fallbackH = 257.5): string {
  if (startH && endH && Math.abs(startH - endH) > 0.1) {
    return `${startH} → ${endH} cm`;
  }
  return `${startH ?? fallbackH} cm`;
}
