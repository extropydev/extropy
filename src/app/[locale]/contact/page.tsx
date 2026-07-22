import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {CopyEmail} from "@/components/contact/copy-email";
import {ArrowUpRightIcon, MailIcon} from "@/components/icons";
import {Reveal} from "@/components/ui/reveal";
import {SectionLabel} from "@/components/ui/section-label";
import {site} from "@/lib/site";

interface ProcessStep {
    title: string;
    body: string;
}

export async function generateMetadata({
                                           params,
                                       }: PageProps<"/[locale]/contact">): Promise<Metadata> {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: "contact"});
    return {title: t("title"), description: t("lede")};
}

export default async function ContactPage({
                                              params,
                                          }: PageProps<"/[locale]/contact">) {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations("contact");
    const steps = t.raw("process.items") as ProcessStep[];

    return (
        <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
            <Reveal>
                <SectionLabel>{t("label")}</SectionLabel>
                <h1 className="mt-6 max-w-3xl text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                    {t("title")}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                    {t("lede")}
                </p>
            </Reveal>

            {/* Email — the main act */}
            <Reveal className="mt-12" delay={0.08}>
                <div className="group petal-card petal-bloom relative overflow-hidden bg-ink p-7 text-cream sm:p-12">
                    <svg
                        viewBox="0 0 10 12"
                        className="pointer-events-none absolute -right-6 -top-8 h-48 w-40 rotate-[22deg] fill-cream/[0.05]"
                        aria-hidden="true"
                    >
                        <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z"/>
                    </svg>
                    <div
                        className="relative flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-bright">
                        <MailIcon className="h-4 w-4"/>
                        {t("emailLabel")}
                    </div>
                    <div className="relative mt-5">
                        <CopyEmail email={site.email}/>
                    </div>
                    <p className="relative mt-5 flex items-center gap-2.5 text-sm font-medium text-cream-soft">
            <span className="relative flex h-2 w-2">
              <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-bright opacity-60"/>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright"/>
            </span>
                        {t("availability")}
                    </p>
                </div>
            </Reveal>

            {/* Socials */}
            <Reveal className="mt-5" delay={0.12}>
                <div className="grid gap-5 sm:grid-cols-3">
                    {site.socials.map((social) => (
                        <a
                            key={social.key}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group petal-card-sm petal-bloom flex items-center justify-between gap-4 bg-paper-raised p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgba(24,23,22,0.35)] sm:p-7"
                        >
                            <div>
                                <p className="font-display text-lg font-bold tracking-tight">
                                    {social.label}
                                </p>
                                <p className="mt-1 text-xs font-semibold text-muted">
                                    {social.handle}
                                </p>
                            </div>
                            <span
                                className="petal-chip flex h-10 w-10 shrink-0 items-center justify-center border border-line-strong text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                <ArrowUpRightIcon className="h-4 w-4"/>
              </span>
                        </a>
                    ))}
                </div>
            </Reveal>

            {/* Process */}
            <Reveal className="mt-20" delay={0.05}>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {t("process.heading")}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                    {t("process.intro")}
                </p>
                <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="petal-card-sm petal-bloom relative overflow-hidden bg-paper-raised p-6 sm:p-7"
                        >
              <span
                  aria-hidden="true"
                  className="text-hollow pointer-events-none absolute -right-1 -top-3 select-none font-display text-[4.5rem] font-extrabold leading-none"
              >
                0{index + 1}
              </span>
                            <span
                                className="petal-chip relative flex h-9 w-9 items-center justify-center bg-accent font-display text-xs font-bold text-paper">
                {index + 1}
              </span>
                            <h3 className="relative mt-4 font-bold text-ink">{step.title}</h3>
                            <p className="relative mt-2 text-sm leading-relaxed text-muted">
                                {step.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </Reveal>
        </div>
    );
}
