"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/cn";

interface StackItem {
  name: string;
  role: string;
  why: string;
}

/**
 * The stack as oversized hollow type: each tool fills with ink on hover,
 * and its "why" unfolds beneath. No boxes, no grid — pure typography.
 */
export function StackSection() {
  const t = useTranslations("home.stack");
  const items = t.raw("items") as StackItem[];
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionLabel>{t("label")}</SectionLabel>
        <h2 className="mt-6 max-w-2xl text-balance font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <Reveal className="mt-12 sm:mt-16" delay={0.1}>
        <ul onMouseLeave={() => setActive(null)}>
          {items.map((item, index) => {
            const isActive = active === index;
            return (
              <li key={item.name}>
                <button
                  type="button"
                  aria-expanded={isActive}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(isActive ? null : index)}
                  className="block w-full cursor-pointer py-2 text-left sm:py-2.5"
                >
                  <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-8 shrink-0 text-xs font-bold tracking-widest transition-colors duration-300",
                        isActive ? "text-accent" : "text-line-strong",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-hollow font-display text-[clamp(1.9rem,6vw,3.9rem)] font-extrabold leading-[1.15] tracking-tight",
                        isActive && "!text-ink",
                      )}
                      style={
                        isActive
                          ? { WebkitTextStrokeColor: "transparent" }
                          : undefined
                      }
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "petal-chip px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300",
                        isActive
                          ? "bg-accent text-paper"
                          : "bg-paper-raised text-muted",
                      )}
                    >
                      {item.role}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-2xl pb-3 pl-[3.25rem] pt-2 text-[15px] leading-relaxed text-ink-soft">
                        {item.why}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
