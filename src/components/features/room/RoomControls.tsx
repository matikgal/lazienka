import type { ViewPreset, RenderSettings } from '../../../types/room';
import { Button } from '../../ui/Button';
import { Toggle } from '../../ui/Toggle';
import { Card } from '../../ui/Card';

interface RoomControlsProps {
  readonly activePreset: ViewPreset;
  readonly settings: RenderSettings;
  readonly onSelectPreset: (preset: ViewPreset) => void;
  readonly onToggleSetting: (key: keyof RenderSettings) => void;
}

export function RoomControls({
  activePreset,
  settings,
  onSelectPreset,
  onToggleSetting,
}: RoomControlsProps) {
  return (
    <Card title="Widok i Renderowanie">
      <div className="controls-section">
        <label className="section-subtitle">Kamera</label>
        <div className="button-group">
          <Button
            variant="secondary"
            isActive={activePreset === 'perspective'}
            onClick={() => onSelectPreset('perspective')}
          >
            Perspektywa 3D
          </Button>
          <Button
            variant="secondary"
            isActive={activePreset === 'top'}
            onClick={() => onSelectPreset('top')}
          >
            Rzut z góry (2D)
          </Button>
          <Button
            variant="secondary"
            isActive={activePreset === 'isometric'}
            onClick={() => onSelectPreset('isometric')}
          >
            Izometria
          </Button>
        </div>
      </div>

      <div className="controls-section">
        <label className="section-subtitle">Elementy sceny</label>
        <div className="toggle-list">
          <Toggle
            id="toggle-dim"
            label="Etykiety wymiarów"
            checked={settings.showDimensions}
            onChange={() => onToggleSetting('showDimensions')}
          />
          <Toggle
            id="toggle-grid"
            label="Siatka bazowa"
            checked={settings.showGrid}
            onChange={() => onToggleSetting('showGrid')}
          />
          <Toggle
            id="toggle-wireframe"
            label="Tryb szkieletowy (wireframe)"
            checked={settings.showWireframe}
            onChange={() => onToggleSetting('showWireframe')}
          />
          <Toggle
            id="toggle-ceiling"
            label="Pokaż płaszczyznę dachu / skosu"
            checked={settings.showCeiling}
            onChange={() => onToggleSetting('showCeiling')}
          />
        </div>
      </div>
    </Card>
  );
}
