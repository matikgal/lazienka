import type { ReactNode } from 'react';

interface CardProps {
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <section className={`card-container ${className}`.trim()}>
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </section>
  );
}
