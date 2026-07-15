"use client";

import {useCallback, useEffect, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "motion/react";
import {useTranslations} from "next-intl";
import {
    LOTUS_CORE_RADIUS,
    LOTUS_PETAL_PATH,
    LOTUS_PETALS,
    petalTransform,
} from "@/components/brand/lotus-geometry";
import {SectionLabel} from "@/components/ui/section-label";
import {cn} from "@/lib/cn";

interface Principle {
    name: string;
    original: string;
    essence: string;
    practice: string;
}

const AUTO_ADVANCE_MS = 5000;

/**
 * The five petals of the extropy mark, one per principle of extropianism —
 * each translated into what it means for a client's project.
 * Rendered as a dark stage: cream lotus, moss-green active petal.
 */
export function Principles() {
    const t = useTranslations("home.principles");
    const principles = t.raw("items") as Principle[];
    const reducedMotion = useReducedMotion();

    const [active, setActive] = useState(2); // start on the tallest petal
    const [paused, setPaused] = useState(false);

    const select = useCallback((index: number) => {
        setActive(index);
        setPaused(true);
    }, []);

    useEffect(() => {
        if (paused || reducedMotion) return;
        const interval = setInterval(
            () => setActive((value) => (value + 1) % LOTUS_PETALS.length),
            AUTO_ADVANCE_MS,
        );
        return () => clearInterval(interval);
    }, [paused, reducedMotion]);

    const principle = principles[active];

    return (
        <section className="mx-auto w-full max-w-[100rem] px-3 py-8 sm:px-5 sm:py-12">
            <div className="petal-card bg-ink px-6 py-14 text-cream sm:px-12 sm:py-20 lg:px-20">
                <div className="mx-auto w-full max-w-5xl">
                    <SectionLabel>{t("label")}</SectionLabel>
                    <h2 className="mt-6 max-w-2xl text-balance font-display text-2xl font-bold leading-snug tracking-tight text-cream sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-cream/65">
                        {t("intro")}
                    </p>

                    <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
                        {/* Interactive lotus */}
                        <div
                            className="mx-auto w-full max-w-md lg:max-w-none"
                            onMouseLeave={() => setPaused(false)}
                        >
                            <svg
                                viewBox="-56 -76 112 106"
                                className="w-full"
                                role="tablist"
                                aria-label={t("label")}
                            >
                                {LOTUS_PETALS.map((petal, index) => (
                                    <g key={petal.angle} transform={petalTransform(petal)}>
                                        <path
                                            d={LOTUS_PETAL_PATH}
                                            role="tab"
                                            aria-selected={active === index}
                                            aria-label={principles[index]?.name}
                                            tabIndex={0}
                                            onClick={() => select(index)}
                                            onMouseEnter={() => select(index)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    select(index);
                                                }
                                            }}
                                            className={cn(
                                                "cursor-pointer outline-none transition-[fill,transform] duration-500",
                                                active === index
                                                    ? "fill-accent-bright"
                                                    : "fill-cream/[0.14] hover:fill-cream/30",
                                            )}
                                            style={{
                                                transform:
                                                    active === index ? "scale(1.045)" : "scale(1)",
                                                transformOrigin: "0 0",
                                            }}
                                        />
                                    </g>
                                ))}
                                {/* petal numbers, placed just past each tip in root coordinates */}
                                {LOTUS_PETALS.map((petal, index) => {
                                    const radians = (petal.angle * Math.PI) / 180;
                                    const distance = 12 + 44 * petal.scale + 9;
                                    return (
                                        <text
                                            key={petal.angle}
                                            x={(distance * Math.sin(radians)).toFixed(2)}
                                            y={(-distance * Math.cos(radians) + 2).toFixed(2)}
                                            textAnchor="middle"
                                            className={cn(
                                                "pointer-events-none font-display font-bold transition-[fill] duration-500",
                                                active === index
                                                    ? "fill-accent-bright"
                                                    : "fill-cream/30",
                                            )}
                                            style={{fontSize: "5px"}}
                                        >
                                            0{index + 1}
                                        </text>
                                    );
                                })}
                                <circle r={LOTUS_CORE_RADIUS} className="fill-cream"/>
                            </svg>
                        </div>

                        {/* Active principle */}
                        <div className="relative min-h-64 sm:min-h-56">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={reducedMotion ? false : {opacity: 0, y: 14}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={reducedMotion ? undefined : {opacity: 0, y: -10}}
                                    transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
                                >
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-bright">
                                        0{active + 1} / 05 — {principle.original}
                                    </p>
                                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-cream sm:text-2xl">
                                        {principle.name}
                                    </h3>
                                    <p className="mt-4 leading-relaxed text-cream/75">
                                        {principle.essence}
                                    </p>
                                    <div className="petal-card-sm mt-6 bg-cream/[0.06] p-5 sm:p-6">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-bright">
                                            {t("inPracticeLabel")}
                                        </p>
                                        <p className="mt-2.5 text-[15px] leading-relaxed text-cream">
                                            {principle.practice}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress bar */}
                            <div className="mt-8 flex gap-2.5">
                                {principles.map((item, index) => (
                                    <button
                                        key={item.original}
                                        type="button"
                                        aria-label={item.name}
                                        onClick={() => select(index)}
                                        className={cn(
                                            "h-1.5 cursor-pointer rounded-full transition-all duration-400",
                                            active === index
                                                ? "w-8 bg-accent-bright"
                                                : "w-3 bg-cream/25 hover:bg-cream/50",
                                        )}
                                    >
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
