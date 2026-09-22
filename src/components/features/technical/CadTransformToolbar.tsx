import type { CadRotation, CadTransformState } from '../../../types/cadTransform';
import { Button } from '../../ui/Button';

interface CadTransformToolbarProps {
  readonly transform: CadTransformState;
  readonly onSetRotation: (rot: CadRotation) => void;
  readonly onToggleFlipH: () => void;
  readonly onToggleFlipV: () => void;
  readonly onReset: () => void;
}

export function CadTransformToolbar({
  transform,
  onSetRotation,
  onToggleFlipH,
  onToggleFlipV,
  onReset,
}: CadTransformToolbarProps) {
  return (
    <div className="cad-transform-toolbar" aria-label="Narzędzia orientacji rzutu CAD">
      <span className="toolbar-label">Orientacja rzutu:</span>
      <div className="cad-btn-group">
        <Button
          variant="secondary"
          isActive={transform.rotation === 180 && !transform.flipH && !transform.flipV}
          onClick={() => onSetRotation(180)}
          title="Domyślny obrót o 180° (odwrócenie góra-dół i lewo-prawo)"
        >
          Obrót 180° (Zalecany)
        </Button>
        <Button
          variant="secondary"
          isActive={transform.rotation === 0 && !transform.flipH && !transform.flipV}
          onClick={() => onSetRotation(0)}
          title="Widok bazowy 0°"
        >
          0°
        </Button>
        <Button
          variant="secondary"
          isActive={transform.rotation === 90}
          onClick={() => onSetRotation(90)}
        >
          90°
        </Button>
        <Button
          variant="secondary"
          isActive={transform.rotation === 270}
          onClick={() => onSetRotation(270)}
        >
          270°
        </Button>
      </div>

      <div className="cad-btn-group">
        <Button
          variant="outline"
          isActive={transform.flipH}
          onClick={onToggleFlipH}
          title="Odbicie lustrzane poziome"
        >
          Lustro H
        </Button>
        <Button
          variant="outline"
          isActive={transform.flipV}
          onClick={onToggleFlipV}
          title="Odbicie lustrzane pionowe"
        >
          Lustro V
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          title="Przywróć orientację 180°"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
