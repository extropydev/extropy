import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
      <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <SectionLabel className="text-muted">{t("label")}</SectionLabel>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
            {t("lede")}
          </p>
        </Reveal>

        {/* Story */}
        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
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
        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("timeline.heading")}
          </h2>
          <ol className="mt-8 space-y-0">
            {timeline.map((entry) => (
              <li
                key={entry.period}
                className="relative grid gap-1 border-l border-line pb-10 pl-8 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
              >
                <svg
                  viewBox="0 0 10 12"
                  className="absolute -left-[5px] top-1.5 h-3 w-2.5 fill-accent"
                  aria-hidden="true"
                >
                  <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
                </svg>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {entry.period}
                </span>
                <div>
                  <h3 className="font-medium text-ink">{entry.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                    {entry.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Languages */}
        <Reveal className="mt-16">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("languages.heading")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {t("languages.intro")}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {languages.map((language) => (
              <div key={language.name} className="bg-paper p-5">
                <p className="font-display text-lg font-semibold">
                  {language.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {language.level}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Why "extropy" */}
        <Reveal className="mt-16">
          <div className="rounded-2xl bg-paper-raised p-7 sm:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {t("why.heading")}
            </p>
            <p className="mt-4 text-pretty font-display text-xl font-medium leading-relaxed text-ink sm:text-[1.35rem]">
              {t("why.body")}
            </p>
          </div>
        </Reveal>
      </div>

      <ContactCta />
    </>
  );
}
