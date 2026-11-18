import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3.6l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Wheat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c0-2.5 1.4-4.6 4-6 1 2.6.4 5-2 6.6" />
      <path d="M12 9c0-2.5-1.4-4.6-4-6-1 2.6-.4 5 2 6.6" />
      <path d="M12 14c0-2 1.2-3.8 3.4-5 .8 2.2.3 4.2-1.7 5.6" />
      <path d="M12 14c0-2-1.2-3.8-3.4-5-.8 2.2-.3 4.2 1.7 5.6" />
    </svg>
  );
}

export function Cow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8c0-1.7 1-3 2.5-3H15c1.5 0 2.5 1.3 2.5 3v6.5A3.5 3.5 0 0 1 14 18H9a4 4 0 0 1-4-4V8Z" />
      <path d="M7 5 5 2M15 5l2-3" />
      <path d="M9.5 12h.01M13 12h.01" />
      <path d="M9 15.5c1.4 1 3.6 1 5 0" />
      <path d="M5 10H3M17 10h2" />
    </svg>
  );
}

export function Egg(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c3.6 0 6 5 6 9a6 6 0 0 1-12 0c0-4 2.4-9 6-9Z" />
      <path d="M9.5 12.5c0 2 1 3.5 2.5 3.5" opacity=".5" />
    </svg>
  );
}

export function Fish(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12c3.2-4.4 6.8-6 10.5-6 3 0 5.6 1.4 7.5 4.2-1.9 2.8-4.5 4.2-7.5 4.2C9.8 14.4 6.2 12.8 3 12Z" />
      <path d="M3 12c1.6 1.8 2.6 3.9 3 6 2-1.6 3.4-3.5 4.2-6" />
      <circle cx="16" cy="11" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Warehouse(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9.5 12 4l9 5.5V21H3V9.5Z" />
      <path d="M7.5 21v-7h9v7" />
      <path d="M7.5 17.5h9" />
    </svg>
  );
}

export function Truck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 6.5h11v9H2zM13 9.5h4l3 3v3h-7" />
      <circle cx="6" cy="18" r="1.8" />
      <circle cx="16.5" cy="18" r="1.8" />
    </svg>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 2.5V11c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V5.5L12 3Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
    </svg>
  );
}

export function CloudOff(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 14.5A3.5 3.5 0 0 1 6 7.8 5.5 5.5 0 0 1 16.4 7a4 4 0 0 1 3.4 5.4" />
      <path d="M3 3l18 18" />
      <path d="M8 19h8a3.5 3.5 0 0 0 1.2-6.8" />
    </svg>
  );
}

export function Refresh(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 11a8 8 0 1 0-2.6 6.4" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M9.4 5.5C6 6.7 3.8 9.6 3.8 13.2c0 3 1.7 5 4.2 5 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.3 0-.7 0-1 .1.3-1.9 1.7-3.5 3.6-4.4l-1.6-1.8Zm10.2 0c-3.4 1.2-5.6 4.1-5.6 7.7 0 3 1.7 5 4.2 5 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.3 0-.7 0-1 .1.3-1.9 1.7-3.5 3.6-4.4l-1.6-1.8Z" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4c-8 0-14 3.6-14 10a5 5 0 0 0 5 5c6.4 0 9-6 9-15Z" />
      <path d="M4 21c1.5-5 4.5-8.5 9-10.5" />
    </svg>
  );
}
