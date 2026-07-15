"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LotusMark } from "@/components/brand/lotus-mark";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./locale-switcher";

const NAV_ITEMS = [
  { href: "/notes", key: "notes" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

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
          "absolute inset-0 border-b transition-[border-color,background-color] duration-300",
          scrolled || menuOpen
            ? "border-line bg-paper/85 backdrop-blur-md"
            : "border-transparent bg-paper/0",
        )}
      />
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-ink"
          aria-label="extropy — home"
        >
          <LotusMark interactive className="h-6 w-8" />
          <span className="font-display text-[1.35rem] font-semibold tracking-tight">
            extropy
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "link-underline text-sm transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <LocaleSwitcher />
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
                "absolute h-px w-5 bg-ink transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-[3.5px]",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-[3.5px]",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 -z-10 flex flex-col overflow-y-auto bg-paper px-5 pb-10 pt-6 transition-all duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-line py-5 font-display text-3xl text-ink"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {t(item.key)}
              <span className="font-mono text-xs text-muted">
                0{index + 1}
              </span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex items-center justify-between text-muted">
          <LotusMark className="h-5 w-7" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            extropy.dev
          </span>
        </div>
      </div>
    </header>
  );
}
