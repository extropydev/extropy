import { setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/home/contact-cta";
import { Hero } from "@/components/home/hero";
import { NotesPreview } from "@/components/home/notes-preview";
import { PersonStrip } from "@/components/home/person-strip";
import { Principles } from "@/components/home/principles";
import { StackSection } from "@/components/home/stack-section";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Principles />
      <NotesPreview locale={locale as Locale} />
      <StackSection />
      <PersonStrip />
      <ContactCta />
    </>
  );
}
