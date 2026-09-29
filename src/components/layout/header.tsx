"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LotusMark } from "@/components/brand/lotus-mark";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./locale-switcher";

const NAV_ITEMS = [
  { href: "/work", key: "work" },
  { href: "/notes", key: "notes" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

function PetalTick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 12" className={className} aria-hidden="true">
      <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      {/*
       * The blurred bar is a separate layer: backdrop-filter turns an element
       * into a containing block for fixed descendants, which would break the
       * fullscreen mobile menu below.
       */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transition-[background-color,box-shadow] duration-300",
          scrolled || menuOpen
            ? "bg-paper/85 shadow-[0_1px_0_0_rgba(24,23,22,0.06)] backdrop-blur-md"
            : "bg-paper/0",
        )}
      />
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-ink"
          aria-label="extropy home"
        >
          <LotusMark interactive className="h-6 w-8" />
          <span className="font-display text-lg font-bold tracking-tight">
            extropy
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "group/nav relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                <PetalTick
                  className={cn(
                    "h-2.5 w-2 transition-all duration-300",
                    active
                      ? "scale-100 fill-accent opacity-100"
                      : "-translate-y-0.5 scale-50 fill-accent opacity-0 group-hover/nav:translate-y-0 group-hover/nav:scale-100 group-hover/nav:opacity-100",
                  )}
                />
                {t(item.key)}
              </Link>
            );
          })}
          <LocaleSwitcher className="ml-3" />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center"
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-ink transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-ink transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 -z-10 flex flex-col overflow-y-auto bg-paper px-5 pb-10 pt-8 transition-all duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-3" aria-label="Mobile">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="petal-card-sm flex items-center justify-between bg-paper-raised px-6 py-6 font-display text-xl font-bold text-ink"
            >
              {t(item.key)}
              <PetalTick className="h-3.5 w-3 fill-accent" />
              <span className="sr-only">{index + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex items-center justify-between pt-10 text-muted">
          <LotusMark className="h-5 w-7" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            extropy.dev
          </span>
        </div>
      </div>
    </header>
  );
}
