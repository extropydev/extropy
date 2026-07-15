"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { GlobeIcon } from "@/components/icons";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Compact 4-language switcher. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={localeNames[locale as Locale]}
        className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
      >
        <GlobeIcon className="h-4 w-4" />
        {locale}
      </button>

      <div
        className={cn(
          "absolute right-0 top-[calc(100%+8px)] z-50 min-w-40 origin-top-right rounded-xl border border-line bg-paper p-1.5 shadow-[0_16px_40px_-12px_rgba(24,23,22,0.18)] transition-all duration-200",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {routing.locales.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => selectLocale(item)}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-paper-raised",
              item === locale ? "text-ink" : "text-muted",
            )}
          >
            {localeNames[item]}
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
