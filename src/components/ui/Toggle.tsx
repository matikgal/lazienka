interface ToggleProps {
  readonly id: string;
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: () => void;
}

export function Toggle({ id, label, checked, onChange }: ToggleProps) {
  return (
    <label htmlFor={id} className="toggle-wrapper">
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        onChange={onChange}
        className="toggle-checkbox"
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-label">{label}</span>
    </label>
  );
}
