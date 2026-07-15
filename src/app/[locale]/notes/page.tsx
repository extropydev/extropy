import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NoteRow } from "@/components/notes/note-row";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getNotes, NOTE_SLUGS } from "@/content/notes";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/notes">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notes" });
  return { title: t("title"), description: t("intro") };
}

export default async function NotesPage({
  params,
}: PageProps<"/[locale]/notes">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("notes");
  const notes = getNotes(locale as Locale);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <SectionLabel className="text-muted">{t("label")}</SectionLabel>
        <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted sm:text-lg">
          {t("intro")}
        </p>
      </Reveal>

      <Reveal className="mt-14 sm:mt-20" delay={0.1}>
        <div>
          {NOTE_SLUGS.map((slug, index) => (
            <NoteRow key={slug} slug={slug} index={index} note={notes[slug]} />
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12" delay={0.05}>
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          {t("outro")}
        </p>
      </Reveal>
    </div>
  );
}
