export const CAD_COLORS = {
  paperBg: '#ffffff',
  gridFine: '#f1f5f9',
  gridMain: '#e2e8f0',
  wallFill: '#1e293b',
  wallStroke: '#000000',
  floorBg: '#fafafa',
  dimLine: '#000000',
  dimText: '#000000',
  dimTick: '#000000',
  doorSymbol: '#059669',
  slantLine: '#b45309',
  slantHatch: '#94a3b8',
} as const;

export const CAD_STROKES = {
  wall: '2',
  wallDoor: '1.5',
  dimLine: '0.75',
  dimWitness: '0.6',
  dimTick: '1.2',
  gridFine: '0.5',
  gridMain: '0.8',
  dashLine: '1',
} as const;

export const CAD_FONTS = {
  main: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  title: 'system-ui, -apple-system, sans-serif',
} as const;
