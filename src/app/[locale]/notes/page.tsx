import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NoteCard } from "@/components/notes/note-card";
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
  const [first, ...rest] = NOTE_SLUGS;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <Reveal>
        <SectionLabel>{t("label")}</SectionLabel>
        <h1 className="mt-6 max-w-3xl text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted sm:text-lg">
          {t("intro")}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
        <Reveal className="flex md:col-span-2">
          <NoteCard
            slug={first}
            index={0}
            note={notes[first]}
            featured
            className="w-full"
          />
        </Reveal>
        {rest.map((slug, position) => (
          <Reveal key={slug} delay={(position % 2) * 0.08} className="flex">
            <NoteCard
              slug={slug}
              index={position + 1}
              note={notes[slug]}
              className="w-full"
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12" delay={0.05}>
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          {t("outro")}
        </p>
      </Reveal>
    </div>
  );
}
