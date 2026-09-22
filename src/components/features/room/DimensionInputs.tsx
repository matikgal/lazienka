import type { RoomDimensions, SlantConfig } from '../../../types/room';
import { InputNumber } from '../../ui/InputNumber';
import { Toggle } from '../../ui/Toggle';
import { Card } from '../../ui/Card';

interface DimensionInputsProps {
  readonly dimensions: RoomDimensions;
  readonly onUpdateDimension: (key: 'width' | 'length' | 'height', value: number) => void;
  readonly onUpdateSlant: (partial: Partial<SlantConfig>) => void;
}

export function DimensionInputs({
  dimensions,
  onUpdateDimension,
  onUpdateSlant,
}: DimensionInputsProps) {
  return (
    <Card title="Wymiary pomieszczenia">
      <div className="dimension-inputs-container">
        <InputNumber
          id="room-width"
          label="Szerokość (oś X)"
          value={dimensions.width}
          min={100}
          max={1200}
          step={5}
          onChange={(v) => onUpdateDimension('width', v)}
        />
        <InputNumber
          id="room-length"
          label="Długość (oś Z)"
          value={dimensions.length}
          min={100}
          max={1200}
          step={5}
          onChange={(v) => onUpdateDimension('length', v)}
        />
        <InputNumber
          id="room-height"
          label="Wysokość (oś Y)"
          value={dimensions.height}
          min={150}
          max={450}
          step={5}
          onChange={(v) => onUpdateDimension('height', v)}
        />

        <div className="slant-controls-wrapper">
          <Toggle
            id="toggle-slant-enabled"
            label="Uwzględnij skos dachowy"
            checked={dimensions.slant.enabled}
            onChange={() => onUpdateSlant({ enabled: !dimensions.slant.enabled })}
          />

          {dimensions.slant.enabled && (
            <div className="slant-subfields">
              <InputNumber
                id="knee-wall-height"
                label="Wysokość ścianki kolankowej"
                value={dimensions.slant.kneeWallHeight}
                min={20}
                max={dimensions.height - 20}
                step={5}
                onChange={(v) => onUpdateSlant({ kneeWallHeight: v })}
              />
              <InputNumber
                id="slant-depth"
                label="Głębokość skosu w głąb"
                value={dimensions.slant.slantDepth}
                min={20}
                max={dimensions.length - 20}
                step={5}
                onChange={(v) => onUpdateSlant({ slantDepth: v })}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
