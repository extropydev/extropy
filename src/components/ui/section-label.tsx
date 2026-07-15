import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Petal-shaped eyebrow chip — the recurring brand label.
 * Works on both light and dark surfaces.
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "petal-chip inline-flex items-center gap-2 bg-accent px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-paper",
        className,
      )}
    >
      <svg
        viewBox="0 0 10 12"
        className="h-2.5 w-2 fill-current opacity-80"
        aria-hidden="true"
      >
        <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
      </svg>
      {children}
    </span>
  );
}
