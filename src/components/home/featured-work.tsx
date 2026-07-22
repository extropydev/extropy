import {getTranslations} from "next-intl/server";
import {ArrowRightIcon} from "@/components/icons";
import {Reveal} from "@/components/ui/reveal";
import {SectionLabel} from "@/components/ui/section-label";
import {WorkCard} from "@/components/work/work-card";
import {getWork, WORK_SLUGS} from "@/content/work";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

/** The proof: four shipped projects, flagship first. */
export async function FeaturedWork({locale}: { locale: Locale }) {
    const t = await getTranslations("work.home");
    const cases = getWork(locale);
    const [flagship, ...rest] = WORK_SLUGS;

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
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
                        href="/work"
                        className="group inline-flex items-center gap-2.5 rounded-[6px] border-2 border-line-strong px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-ink"
                    >
                        {t("viewAll")}
                        <ArrowRightIcon className="h-4 w-4"/>
                    </Link>
                </div>
            </Reveal>

            <div className="mt-12 flex flex-col gap-6">
                <Reveal>
                    <WorkCard slug={flagship} caseData={cases[flagship]} wide priority/>
                </Reveal>
                <div className="grid gap-6 lg:grid-cols-3">
                    {rest.slice(0,3).map((slug, position) => (
                        <Reveal key={slug} delay={(position % 3) * 0.08} className="flex">
                            <WorkCard slug={slug} caseData={cases[slug]} className="w-full"/>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
