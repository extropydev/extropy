import { getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "@/components/icons";
import { NoteCard } from "@/components/notes/note-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getNotes, NOTE_SLUGS } from "@/content/notes";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function NotesPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations("home.notes");
  const notes = getNotes(locale);
  const featured = NOTE_SLUGS.slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>{t("label")}</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-balance font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
              {t("intro")}
            </p>
          </div>
          <Link
            href="/notes"
            className="group inline-flex items-center gap-2.5 rounded-[6px] border-2 border-line-strong px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-ink"
          >
            {t("viewAll")}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {featured.map((slug, position) => (
          <Reveal key={slug} delay={position * 0.08} className="flex">
            <NoteCard
              slug={slug}
              index={NOTE_SLUGS.indexOf(slug)}
              note={notes[slug]}
              className="w-full"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
