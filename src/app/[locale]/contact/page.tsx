import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CopyEmail } from "@/components/contact/copy-email";
import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";

interface ProcessStep {
  title: string;
  body: string;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lede") };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const steps = t.raw("process.items") as ProcessStep[];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <SectionLabel className="text-muted">{t("label")}</SectionLabel>
        <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          {t("lede")}
        </p>
      </Reveal>

      {/* Email */}
      <Reveal className="mt-14" delay={0.08}>
        <div className="rounded-2xl border border-line p-7 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {t("emailLabel")}
          </p>
          <div className="mt-4">
            <CopyEmail email={site.email} />
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("availability")}
          </p>
        </div>
      </Reveal>

      {/* Socials */}
      <Reveal className="mt-6" delay={0.12}>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {site.socials.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 bg-paper p-6 transition-colors duration-300 hover:bg-paper-raised sm:p-7"
            >
              <div>
                <p className="font-display text-xl font-semibold tracking-tight">
                  {social.label}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  @extropy.dev
                </p>
              </div>
              <ArrowUpRightIcon className="h-5 w-5 text-muted transition-colors group-hover:text-ink" />
            </a>
          ))}
        </div>
      </Reveal>

      {/* Process */}
      <Reveal className="mt-20" delay={0.05}>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("process.heading")}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          {t("process.intro")}
        </p>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-6 sm:p-7">
              <span className="font-mono text-sm text-accent">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
