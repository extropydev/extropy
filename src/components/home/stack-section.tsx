"use client";

import {useTranslations} from "next-intl";
import {Reveal} from "@/components/ui/reveal";
import {SectionLabel} from "@/components/ui/section-label";

interface StackItem {
    name: string;
    role: string;
    why: string;
}

/**
 * Quiet and fully open: every tool is set as a small entry on a ruled grid,
 * nothing hidden behind a hover. Two columns on desktop, one on a phone,
 * with the petal mark as the only ornament.
 */
export function StackSection() {
    const t = useTranslations("home.stack");
    const items = t.raw("items") as StackItem[];

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
                <div className="max-w-3xl">
                    <SectionLabel>{t("label")}</SectionLabel>
                    <h2 className="mt-6 text-balance font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
                        {t("intro")}
                    </p>
                </div>
            </Reveal>

            <Reveal className="mt-10 sm:mt-14" delay={0.1}>
                <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-14">
                    {items.map((item) => (
                        <li
                            key={item.name}
                            className="group border-b border-line py-6 sm:py-7"
                        >
                            <div className="flex items-baseline gap-3">
                                <span
                                    aria-hidden="true"
                                    className="h-2 w-2 shrink-0 translate-y-[-0.15rem] rounded-[6px_1px_6px_1px] bg-line-strong transition-colors duration-300 group-hover:bg-accent"
                                />
                                <h3 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
                                    {item.name}
                                </h3>
                                <span className="ml-auto shrink-0 text-sm text-muted">
                                    {item.role}
                                </span>
                            </div>

                            <p className="mt-2.5 max-w-md pl-5 text-[15px] leading-relaxed text-ink-soft">
                                {item.why}
                            </p>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </section>
    );
}