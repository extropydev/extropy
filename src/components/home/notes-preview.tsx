import { getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "@/components/icons";
import { NoteRow } from "@/components/notes/note-row";
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
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel className="text-muted">{t("label")}</SectionLabel>
            <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
              {t("intro")}
            </p>
          </div>
          <Link
            href="/notes"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink"
          >
            <span className="link-underline">{t("viewAll")}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <Reveal className="mt-12" delay={0.1}>
        <div>
          {featured.map((slug) => (
            <NoteRow
              key={slug}
              slug={slug}
              index={NOTE_SLUGS.indexOf(slug)}
              note={notes[slug]}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
