import type {ReactNode} from 'react';

type IconProps = {className?: string};

function Icon({children}: {children: ReactNode}) {
  return (
    <svg
      className="feature-icon"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {children}
    </svg>
  );
}

export function BoltIcon(_props: IconProps) {
  return (
    <Icon>
      <polygon points="13 2 3 14 11 14 10 22 21 10 13 10 13 2" />
    </Icon>
  );
}

export function DecoratorIcon(_props: IconProps) {
  return (
    <Icon>
      <path d="M4 17c3-1 3-4 0-5 3-1 3-4 0-5" />
      <path d="M20 17c-3-1-3-4 0-5-3-1-3-4 0-5" />
    </Icon>
  );
}

export function DatabaseIcon(_props: IconProps) {
  return (
    <Icon>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </Icon>
  );
}

export function ReactIcon(_props: IconProps) {
  return (
    <Icon>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    </Icon>
  );
}

export function PlugIcon(_props: IconProps) {
  return (
    <Icon>
      <path d="M9 2v4M15 2v4" />
      <path d="M7 6h10v4a5 5 0 0 1-10 0V6z" />
      <path d="M12 15v7" />
    </Icon>
  );
}

export function ShieldIcon(_props: IconProps) {
  return (
    <Icon>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  );
}
