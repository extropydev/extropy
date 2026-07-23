import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ArrowRightIcon, ArrowUpRightIcon} from "@/components/icons";
import {Reveal} from "@/components/ui/reveal";
import {SectionLabel} from "@/components/ui/section-label";
import {BrowserFrame} from "@/components/work/browser-frame";
import {
    getCase,
    getWork,
    isWorkSlug,
    WORK_SLUGS,
    workImage,
    workMeta,
} from "@/content/work";
import {Link} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        WORK_SLUGS.map((slug) => ({locale, slug})),
    );
}

export async function generateMetadata({
                                           params,
                                       }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
    const {locale, slug} = await params;
    if (!isWorkSlug(slug)) return {};
    const caseData = getCase(locale as Locale, slug);
    return {
        title: `${workMeta[slug].name}, ${caseData.type}`,
        description: caseData.tagline,
    };
}

function CaseHeading({children}: { children: React.ReactNode }) {
    return (
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            {children}
        </h2>
    );
}

export default async function CasePage({
                                           params,
                                       }: PageProps<"/[locale]/work/[slug]">) {
    const {locale, slug} = await params;
    setRequestLocale(locale);
    if (!isWorkSlug(slug)) notFound();

    const t = await getTranslations("work");
    const caseData = getCase(locale as Locale, slug);
    const meta = workMeta[slug];

    const index = WORK_SLUGS.indexOf(slug);
    const nextSlug = WORK_SLUGS[(index + 1) % WORK_SLUGS.length];
    const nextCase = getWork(locale as Locale)[nextSlug];

    return (
        <article className="mx-auto w-full max-w-5xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
            {/* Head */}
            <Reveal>
                <Link
                    href="/work"
                    className="group inline-flex items-center gap-2 rounded-[6px] border-2 border-line-strong px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-ink"
                >
                    <ArrowRightIcon className="h-3.5 w-3.5 rotate-180"/>
                    {t("backToWork")}
                </Link>

                <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <SectionLabel>{caseData.type}</SectionLabel>
                        <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                            {meta.name}
                        </h1>
                        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                            {caseData.tagline}
                        </p>
                    </div>
                    <a
                        href={meta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2.5 rounded-[6px] bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-accent"
                    >
                        {t("visitLive")}
                        <ArrowUpRightIcon className="h-4 w-4"/>
                    </a>
                </div>

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
            {/* Hero screenshot */}
            <Reveal className="mt-12">
                <BrowserFrame
                    src={workImage(meta.hero)}
                    alt={meta.name}
                    url={meta.url}
                    priority
                    sizes="(min-width: 1024px) 960px, 100vw"
                />
            </Reveal>

            {/* Overview + built */}
            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                <Reveal>
                    <CaseHeading>{t("aboutHeading")}</CaseHeading>
                    <div className="mt-5 space-y-4">
                        {caseData.overview.map((paragraph) => (
                            <p key={paragraph} className="leading-relaxed text-ink-soft">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                    {caseData.note && (
                        <p className="petal-card-sm mt-6 bg-paper-raised p-5 text-sm leading-relaxed text-muted">
                            {caseData.note}
                        </p>
                    )}
                </Reveal>

                <Reveal delay={0.08}>
                    <CaseHeading>{t("builtHeading")}</CaseHeading>
                    <ul className="mt-5 space-y-3">
                        {caseData.built.map((item, itemIndex) => (
                            <li
                                key={item.title}
                                className="petal-card-sm petal-bloom bg-paper-raised p-5 sm:p-6"
                            >
                                <p className="flex items-center gap-3">
                  <span className="font-display text-sm font-extrabold text-accent">
                    0{itemIndex + 1}
                  </span>
                                    <span className="font-bold text-ink">{item.title}</span>
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                                    {item.body}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            {/* Gallery */}
            <Reveal className="mt-16">
                <CaseHeading>{t("galleryHeading")}</CaseHeading>
                <div
                    className={
                        meta.shots.length > 1
                            ? "mt-6 grid gap-8 sm:grid-cols-2"
                            : "mt-6 grid gap-8"
                    }
                >
                    {meta.shots.map((shot) => (
                        <figure key={shot}>
                            <BrowserFrame
                                src={workImage(shot)}
                                alt={caseData.captions[shot] ?? meta.name}
                                url={meta.url}
                            />
                            {/* ОПИСАНИЕ К ФОТО */}
                            <figcaption className="mt-3 flex items-center gap-2.5 text-sm text-muted">
                                <svg
                                    viewBox="0 0 10 12"
                                    className="h-2.5 w-2 shrink-0 fill-accent"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z"/>
                                </svg>
                                
                                {caseData.captions[shot]}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </Reveal>

            {/* Craft */}
            <Reveal className="mt-16">
                <CaseHeading>{t("craftHeading")}</CaseHeading>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {caseData.craft.map((item) => (
                        <div
                            key={item.title}
                            className="petal-card-sm bg-accent-deep p-6 text-cream sm:p-7"
                        >
                            <p className="font-bold">{item.title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-cream/75">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Next case */}
            <Reveal className="mt-16">
                <Link
                    href={`/work/${nextSlug}`}
                    className="group petal-card petal-bloom flex items-center justify-between gap-6 bg-paper-raised p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgba(24,23,22,0.35)] sm:p-9"
                >
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                            {t("nextProject")}
                        </p>
                        <p className="mt-2.5 font-display text-lg font-bold text-ink sm:text-xl">
                            {workMeta[nextSlug].name}
                        </p>
                        <p className="mt-1 text-sm text-muted">{nextCase.type}</p>
                    </div>
                    <span
                        className="petal-chip flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-cream transition-colors duration-300 group-hover:bg-accent">
            <ArrowRightIcon className="h-5 w-5"/>
          </span>
                </Link>
            </Reveal>
        </article>
    );
}
