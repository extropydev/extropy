import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LotusMark } from "@/components/brand/lotus-mark";
import { ContactCta } from "@/components/home/contact-cta";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

interface TimelineEntry {
  period: string;
  title: string;
  body: string;
}

interface LanguageEntry {
  name: string;
  level: string;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lede") };
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const timeline = t.raw("timeline.items") as TimelineEntry[];
  const languages = t.raw("languages.items") as LanguageEntry[];
  const story = t.raw("story.body") as string[];

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <Reveal>
          <SectionLabel>{t("label")}</SectionLabel>
          <h1 className="mt-6 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
            {t("title")}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
            {t("lede")}
          </p>
        </Reveal>

        {/* Story */}
        <Reveal className="mt-14">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {t("story.heading")}
          </h2>
          <div className="mt-6 space-y-5">
            {story.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal className="mt-14">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {t("timeline.heading")}
          </h2>
          <ol className="mt-8 space-y-4">
            {timeline.map((entry, index) => (
              <li
                key={entry.period}
                className="petal-card-sm petal-bloom grid gap-3 bg-paper-raised p-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6 sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 10 12"
                    className="mt-0.5 h-3.5 w-3 shrink-0 fill-accent"
                    style={{ rotate: `${(index - 2) * 24}deg` }}
                    aria-hidden="true"
                  >
                    <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
                    {entry.period}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-ink">{entry.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                    {entry.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Languages */}
        <Reveal className="mt-14">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {t("languages.heading")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {t("languages.intro")}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {languages.map((language) => (
              <div
                key={language.name}
                className="petal-card-sm petal-bloom bg-paper-raised p-5"
              >
                <p className="font-display text-base font-bold">
                  {language.name}
                </p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                  {language.level}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Why "extropy" */}
        <Reveal className="mt-14">
          <div className="petal-card relative overflow-hidden bg-accent-deep p-7 text-cream sm:p-10">
            <LotusMark className="pointer-events-none absolute -right-10 -top-8 h-44 w-56 rotate-12 text-cream/[0.06]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-bright">
              {t("why.heading")}
            </p>
            <p className="relative mt-4 text-pretty font-display text-lg font-bold leading-normal sm:text-xl">
              {t("why.body")}
            </p>
          </div>
        </Reveal>
      </div>

      <ContactCta />
    </>
  );
}
