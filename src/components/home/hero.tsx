import { getTranslations } from "next-intl/server";
import { HeroLotus } from "@/components/brand/hero-lotus";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Link } from "@/i18n/navigation";

/** Five small petals orbiting slowly behind the hero lotus. */
function OrbitDecoration() {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className="absolute inset-0 h-full w-full text-line-strong"
      aria-hidden="true"
    >
      <circle
        r="88"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 5"
        strokeLinecap="round"
      />
      <g className="animate-orbit">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M0 0 C -2.6 -2.2, -3.2 -6.5, 0 -9.5 C 3.2 -6.5, 2.6 -2.2, 0 0 Z"
            transform={`rotate(${angle}) translate(0 -88) `}
            className="fill-accent/50"
          />
        ))}
      </g>
    </svg>
  );
}

export async function Hero() {
  const t = await getTranslations("home.hero");
  const facts = (await getTranslations("home")).raw("facts") as string[];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:pb-24">
        <div>
          <Reveal>
            <SectionLabel>{t("label")}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-7 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              {t("titleA")}{" "}
              <span className="text-accent">{t("titleB")}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted sm:text-lg">
              {t("lede")}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2.5 rounded-[6px] bg-ink px-6 py-3.5 text-sm font-bold text-paper transition-colors duration-300 hover:bg-accent"
              >
                {t("ctaPrimary")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-[6px] border-2 border-line-strong px-6 py-[calc(0.875rem-2px)] text-sm font-bold text-ink transition-colors duration-300 hover:border-ink"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {facts.map((fact) => (
                <span
                  key={fact}
                  className="petal-chip border border-line bg-paper-raised/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                >
                  {fact}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center text-ink sm:max-w-md">
          <OrbitDecoration />
          <HeroLotus className="relative w-[72%]" />
        </div>
      </div>
    </section>
  );
}
