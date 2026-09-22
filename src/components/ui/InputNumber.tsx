import type { ChangeEvent } from 'react';

interface InputNumberProps {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly unit?: string;
  readonly onChange: (value: number) => void;
}

export function InputNumber({
  id,
  label,
  value,
  min = 10,
  max = 2000,
  step = 5,
  unit = 'cm',
  onChange,
}: InputNumberProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(e.target.value);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="input-group">
      <div className="input-label-row">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <span className="input-unit-badge">
          {value} {unit} ({(value / 100).toFixed(2)} m)
        </span>
      </div>
      <div className="input-control-wrapper">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="input-range"
          aria-label={label}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="input-number-field"
          aria-label={`${label} wartość numeryczna`}
        />
      </div>
    </div>
  );
}
