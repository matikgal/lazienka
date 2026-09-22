import { CAD_COLORS } from '../../../utils/cadStyles';

export function CadDefs() {
  return (
    <defs>
      <pattern id="cadGridFine" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke={CAD_COLORS.gridFine} strokeWidth="0.5" />
      </pattern>
      <pattern id="cadGridMain" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="url(#cadGridFine)" />
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke={CAD_COLORS.gridMain} strokeWidth="0.8" />
      </pattern>
      <pattern id="cadSlantHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="3,3" />
      </pattern>
    </defs>
  );
}
