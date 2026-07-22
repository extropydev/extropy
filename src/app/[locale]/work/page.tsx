import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {WorkCard} from "@/components/work/work-card";
import {Reveal} from "@/components/ui/reveal";
import {SectionLabel} from "@/components/ui/section-label";
import {getWork, WORK_SLUGS} from "@/content/work";
import type {Locale} from "@/i18n/routing";

export async function generateMetadata({
                                           params,
                                       }: PageProps<"/[locale]/work">): Promise<Metadata> {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: "work"});
    return {title: t("title"), description: t("intro")};
}

export default async function WorkPage({
                                           params,
                                       }: PageProps<"/[locale]/work">) {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations("work");
    const cases = getWork(locale as Locale);

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

            <div className="mt-12 flex flex-col gap-6 sm:mt-16">
                {WORK_SLUGS.map((slug, index) => (
                    <Reveal key={slug}>
                        <WorkCard
                            slug={slug}
                            caseData={cases[slug]}
                            wide
                            priority={index === 0}
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
