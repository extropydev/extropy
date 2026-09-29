"use client";

import {useEffect, useRef, useState} from "react";
import {useLocale} from "next-intl";
import {GlobeIcon} from "@/components/icons";
import {usePathname, useRouter} from "@/i18n/navigation";
import {localeNames, routing, type Locale} from "@/i18n/routing";
import {cn} from "@/lib/cn";

export function LocaleSwitcher({className}: { className?: string }) {
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
        router.replace(pathname, {locale: next});
    }

    return (
        <div ref={rootRef} className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-label={localeNames[locale as Locale]}
                className="group petal-chip flex cursor-pointer items-center gap-1.5 border border-line-strong px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
                <GlobeIcon className="h-4 w-4"/>
                {locale}
            </button>

            <div
                className={cn(
                    "petal-card-sm absolute right-0 top-[calc(100%+8px)] z-50 min-w-44 origin-top-right bg-ink p-2 shadow-[0_20px_50px_-16px_rgba(24,23,22,0.45)] transition-all duration-200",
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
                            "flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors hover:bg-cream/10",
                            item === locale ? "text-cream" : "text-cream-soft",
                        )}
                    >
                        {localeNames[item]}
                        {item === locale ? (
                            <svg
                                viewBox="0 0 10 12"
                                className="h-2.5 w-2 fill-accent-bright"
                                aria-hidden="true"
                            >
                                <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z"/>
                            </svg>
                        ) : (
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                {item}
              </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
