import { getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { Link } from "@/i18n/navigation";

export async function PersonStrip() {
  const t = await getTranslations("home.person");

  return (
    <section className="border-t border-line bg-paper-raised/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[auto_1fr] lg:gap-20">
        <Reveal>
          <SectionLabel className="text-muted">{t("label")}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-3xl text-balance font-display text-2xl font-medium leading-normal text-ink sm:text-[2rem] sm:leading-snug">
            {t("body")}
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink"
          >
            <span className="link-underline">{t("cta")}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
