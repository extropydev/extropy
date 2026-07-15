import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/** Mono eyebrow label with a petal-shaped accent tick. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em]",
        className,
      )}
    >
      <svg viewBox="0 0 10 12" className="h-3 w-2.5 fill-accent" aria-hidden="true">
        <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
      </svg>
      {children}
    </span>
  );
}
