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
    <article className="mx-auto w-full max-w-3xl px-5 pb-28 pt-14 sm:px-8 sm:pt-20">
      {/* Head */}
      <Reveal>
        <Link
          href="/notes"
          className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
        >
          ← {t("backToNotes")}
        </Link>

        <div className="mt-10 flex items-start justify-between gap-6">
          <div>
            <SectionLabel className="text-muted">
              {t("noteLabel")} {number} / 05
            </SectionLabel>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {note.title}
            </h1>
          </div>
          <span className="group hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line text-ink sm:flex">
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
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      {/* The worry */}
      <Reveal className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {t("worryLabel")}
        </p>
        <blockquote className="mt-4 border-l-2 border-accent pl-6 font-display text-2xl font-medium italic leading-snug text-ink-soft sm:text-[1.7rem]">
          “{note.worry}”
        </blockquote>
      </Reveal>

      {/* Reality */}
      <Reveal className="mt-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-accent">01</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {note.reality.heading}
          </h2>
        </div>
        <div className="mt-6 space-y-5">
          {note.reality.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Approach */}
      <Reveal className="mt-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-accent">02</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {note.approach.heading}
          </h2>
        </div>
        <p className="mt-4 leading-relaxed text-muted">{note.approach.intro}</p>
        <dl className="mt-8 space-y-0 border-t border-line">
          {note.approach.items.map((item, itemIndex) => (
            <div
              key={item.title}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
            >
              <span className="font-mono text-xs text-muted">
                {number}.{itemIndex + 1}
              </span>
              <div>
                <dt className="font-medium text-ink">{item.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {item.body}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Code */}
      <Reveal className="mt-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-accent">03</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("codeHeading")}
          </h2>
        </div>
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
      <Reveal className="mt-16">
        <div className="rounded-2xl bg-paper-raised p-7 sm:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {note.bottomLine.heading}
          </p>
          <p className="mt-4 text-pretty font-display text-xl font-medium leading-relaxed text-ink sm:text-[1.35rem]">
            {note.bottomLine.body}
          </p>
        </div>
      </Reveal>

      {/* Next note */}
      <Reveal className="mt-16">
        <Link
          href={`/notes/${nextSlug}`}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-line-strong hover:bg-paper-raised sm:p-8"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {t("nextNote")}
            </p>
            <p className="mt-2 font-display text-xl font-medium text-ink sm:text-2xl">
              {nextNote.title}
            </p>
          </div>
          <ArrowRightIcon className="h-6 w-6 shrink-0 text-muted transition-colors group-hover:text-ink" />
        </Link>
      </Reveal>
    </article>
  );
}
