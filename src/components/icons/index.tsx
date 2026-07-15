import { cn } from "@/lib/cn";

/**
 * Hand-drawn icon set for extropy.dev — no icon libraries.
 * Every icon inherits `currentColor` and animates when a parent `.group`
 * is hovered (keyframes live in globals.css).
 */

interface IconProps {
  className?: string;
}

function Svg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Bank card with a heartbeat line that draws itself on hover. */
export function PaymentsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" />
      <rect x="5.5" y="8.2" width="3.4" height="2.4" rx="0.6" />
      <path
        d="M5 14.8h2.6l1.8-2.6 1.8 4.8 1.8-3.4.9 1.2H19"
        className="icon-pulse-line"
      />
    </Svg>
  );
}

/** Key that turns into the lock on hover. */
export function AuthIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g className="icon-key">
        <circle cx="15.5" cy="8.5" r="3.6" />
        <path d="M12.9 11.1 6 18v2.6h2.6M8.2 18.4l-1.6-1.6" />
      </g>
    </Svg>
  );
}

/** Basket; items drop in one by one on hover. */
export function CartIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4.2 9.8h15.6l-1.7 8.7a2.1 2.1 0 0 1-2 1.7H7.9a2.1 2.1 0 0 1-2-1.7Z" />
      <path d="M9 9.8a3 3 0 0 1 6 0" />
      <g fill="currentColor" stroke="none">
        <circle cx="9" cy="4.6" r="1.1" className="icon-cart-item" />
        <circle cx="12.2" cy="3.2" r="1.1" className="icon-cart-item" />
        <circle cx="15.3" cy="4.6" r="1.1" className="icon-cart-item" />
      </g>
    </Svg>
  );
}

/** Desktop frame; the phone slides out of it on hover. */
export function ResponsiveIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.75" y="4.5" width="14.5" height="11.5" rx="1.8" />
      <path d="M7.5 19.5h5" />
      <path d="M10 16v3.5" />
      <g className="icon-frame-small">
        <rect x="15" y="10.5" width="6.25" height="9.5" rx="1.6" fill="var(--paper)" />
        <path d="M17.4 17.9h1.4" />
      </g>
    </Svg>
  );
}

/** Speed gauge; the needle sweeps on hover. */
export function PerformanceIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M4 15h1.6M18.4 15H20M6 9.5l1.2 1.2M18 9.5l-1.2 1.2M12 7v1.7" />
      <path d="M12 15 12 9.8" className="icon-needle" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** External / forward arrow, nudges north-east on hover. */
export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g className="icon-arrow icon-arrow-ne">
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </g>
    </Svg>
  );
}

/** Forward arrow, nudges east on hover. */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g className="icon-arrow icon-arrow-e">
        <path d="M4.5 12H19" />
        <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
      </g>
    </Svg>
  );
}

/** Globe; the meridian flips on hover. */
export function GlobeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.8" ry="8.5" className="icon-meridian" />
      <path d="M3.8 12h16.4" />
    </Svg>
  );
}

/** Envelope. */
export function MailIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </Svg>
  );
}
