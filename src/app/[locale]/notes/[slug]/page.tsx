import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRightIcon } from "@/components/icons";
import { CodeBlock } from "@/components/notes/code-block";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import {
  getNote,
  getNotes,
  isNoteSlug,
  NOTE_SLUGS,
  noteMeta,
  noteSnippets,
} from "@/content/notes";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    NOTE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/notes/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isNoteSlug(slug)) return {};
  const note = getNote(locale as Locale, slug);
  return { title: note.title, description: note.tagline };
}

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="petal-chip flex h-9 w-9 shrink-0 items-center justify-center bg-accent font-display text-xs font-bold text-paper">
        {number}
      </span>
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
        {children}
      </h2>
    </div>
  );
}

export default async function NotePage({
  params,
}: PageProps<"/[locale]/notes/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isNoteSlug(slug)) notFound();

  const t = await getTranslations("notes");
  const note = getNote(locale as Locale, slug);
  const meta = noteMeta[slug];
  const Icon = meta.icon;

  const index = NOTE_SLUGS.indexOf(slug);
  const number = String(index + 1).padStart(2, "0");
  const nextSlug = NOTE_SLUGS[(index + 1) % NOTE_SLUGS.length];
  const nextNote = getNotes(locale as Locale)[nextSlug];

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      {/* Head */}
      <Reveal>
        <Link
          href="/notes"
          className="group inline-flex items-center gap-2 rounded-[6px] border-2 border-line-strong px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-ink"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          {t("backToNotes")}
        </Link>

        <div className="mt-10 flex items-start justify-between gap-6">
          <div>
            <SectionLabel>
              {t("noteLabel")} {number} / 05
            </SectionLabel>
            <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
              {note.title}
            </h1>
          </div>
          <span className="group petal-chip hidden h-16 w-16 shrink-0 items-center justify-center bg-ink text-cream sm:flex">
            <Icon className="h-8 w-8" />
          </span>
        </div>

        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
          {note.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {meta.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-[4px] border border-line-strong/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      {/* The worry */}
      <Reveal className="mt-14">
        <div className="petal-card relative overflow-hidden bg-paper-raised p-7 sm:p-10">
          <svg
            viewBox="0 0 10 12"
            className="pointer-events-none absolute -right-4 -top-6 h-32 w-28 rotate-[22deg] fill-ink/[0.05]"
            aria-hidden="true"
          >
            <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
          </svg>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            {t("worryLabel")}
          </p>
          <p className="relative mt-4 text-balance font-display text-lg font-bold leading-normal text-ink sm:text-xl">
            “{note.worry}”
          </p>
        </div>
      </Reveal>

      {/* Reality */}
      <Reveal className="mt-14">
        <SectionHeading number="01">{note.reality.heading}</SectionHeading>
        <div className="mt-6 space-y-5">
          {note.reality.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Approach */}
      <Reveal className="mt-14">
        <SectionHeading number="02">{note.approach.heading}</SectionHeading>
        <p className="mt-4 leading-relaxed text-muted">{note.approach.intro}</p>
        <dl className="mt-8 space-y-4">
          {note.approach.items.map((item, itemIndex) => (
            <div
              key={item.title}
              className="petal-card-sm petal-bloom bg-paper-raised p-6 transition-colors sm:p-7"
            >
              <dt className="flex items-center gap-3">
                <span className="font-display text-sm font-extrabold text-accent">
                  {number}.{itemIndex + 1}
                </span>
                <span className="font-bold text-ink">{item.title}</span>
              </dt>
              <dd className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Code */}
      <Reveal className="mt-14">
        <SectionHeading number="03">{t("codeHeading")}</SectionHeading>
        <div className="mt-6">
          <CodeBlock
            code={noteSnippets[slug]}
            file={meta.codeFile}
            lang={meta.codeLang}
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {note.code.caption}
        </p>
      </Reveal>

      {/* Bottom line */}
      <Reveal className="mt-14">
        <div className="petal-card bg-accent-deep p-7 text-cream sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-bright">
            {note.bottomLine.heading}
          </p>
          <p className="mt-4 text-pretty font-display text-lg font-bold leading-normal sm:text-xl">
            {note.bottomLine.body}
          </p>
        </div>
      </Reveal>

      {/* Next note */}
      <Reveal className="mt-14">
        <Link
          href={`/notes/${nextSlug}`}
          className="group petal-card petal-bloom flex items-center justify-between gap-6 bg-paper-raised p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgba(24,23,22,0.35)] sm:p-9"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              {t("nextNote")}
            </p>
            <p className="mt-2.5 font-display text-lg font-bold text-ink sm:text-xl">
              {nextNote.title}
            </p>
          </div>
          <span className="petal-chip flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-cream transition-colors duration-300 group-hover:bg-accent">
            <ArrowRightIcon className="h-5 w-5" />
          </span>
        </Link>
      </Reveal>
    </article>
  );
}
