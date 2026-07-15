import { getTranslations } from "next-intl/server";
import { HeroLotus } from "@/components/brand/hero-lotus";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const facts = (await getTranslations("home")).raw("facts") as string[];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.2fr_1fr] lg:pb-28">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              {t("label")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {t("titleA")}{" "}
              <em className="italic text-accent">{t("titleB")}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted sm:text-lg">
              {t("lede")}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/notes"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent-deep"
              >
                {t("ctaPrimary")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="link-underline text-sm font-medium text-ink"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-xs text-ink sm:max-w-sm lg:max-w-none">
          <HeroLotus className="w-full" />
        </div>
      </div>

      {/* Fact strip */}
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4 sm:px-8">
          {facts.map((fact) => (
            <span
              key={fact}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
            >
              {fact}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
