import { getTranslations } from "next-intl/server";
import { LotusMark } from "@/components/brand/lotus-mark";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Link } from "@/i18n/navigation";

export async function PersonStrip() {
  const t = await getTranslations("home.person");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="petal-card relative overflow-hidden bg-paper-raised px-7 py-14 sm:px-12 sm:py-20 lg:px-16">
        {/* Watermark lotus bleeding off the corner */}
        <LotusMark className="pointer-events-none absolute -right-16 -top-10 h-56 w-72 rotate-12 text-ink/[0.05] sm:h-72 sm:w-96" />

        <Reveal>
          <SectionLabel>{t("label")}</SectionLabel>
          <p className="relative mt-8 max-w-3xl text-balance font-display text-xl font-bold leading-normal text-ink sm:text-[1.7rem] sm:leading-snug">
            {t("body")}
          </p>
          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-[6px] bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-accent"
          >
            {t("cta")}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
