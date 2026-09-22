import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly isActive?: boolean;
}

export function Button({
  children,
  variant = 'secondary',
  isActive = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyle = 'btn';
  const variantStyle = `btn-${variant}`;
  const activeStyle = isActive ? 'btn-active' : '';

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle} ${activeStyle} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
