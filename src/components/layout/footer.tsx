import {getTranslations} from "next-intl/server";
import {LotusMark} from "@/components/brand/lotus-mark";
import {ArrowUpRightIcon} from "@/components/icons";
import {Link} from "@/i18n/navigation";
import {site} from "@/lib/site";
import {LocalTime} from "./local-time";
import GmailSvg from "@/components/ui/svg-icons/GmailSvg";

export async function Footer() {
    const t = await getTranslations("footer");
    const nav = await getTranslations("nav");

    return (
        <footer className="bg-ink text-cream">
            <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
                <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-sm">
                        <LotusMark className="h-9 w-12 text-cream" interactive/>
                        <p className="mt-6 text-balance font-display text-lg font-bold leading-snug text-cream sm:text-xl">
                            {t("tagline")}
                        </p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-cream-soft">
                            {t("location")} · <LocalTime/>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 sm:gap-20">
                        <nav aria-label={t("sitemapLabel")}>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-bright">
                                {t("sitemapLabel")}
                            </h3>
                            <ul className="mt-5 space-y-3 text-sm font-medium">
                                {(
                                    [
                                        {href: "/", key: "home"},
                                        {href: "/notes", key: "notes"},
                                        {href: "/about", key: "about"},
                                        {href: "/contact", key: "contact"},
                                    ] as const
                                ).map((item) => (
                                    <li key={item.key}>
                                        <Link
                                            href={item.href}
                                            className="inline-block text-cream/75 transition-[color,transform] duration-300 hover:text-cream"
                                        >
                                            {nav(item.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-label={t("elsewhereLabel")}>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-bright">
                                {t("elsewhereLabel")}
                            </h3>
                            <ul className="mt-5 space-y-3 text-sm font-medium">
                                {site.socials.map((social) => (
                                    <div key={social.key} className="flex flex-row gap-3 items-center">
                                        <div className="w-[30px] h-[30px]">
                                            {social.icon}
                                        </div>
                                        <li>
                                            <a
                                                href={social.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group inline-flex items-center gap-1 text-cream/75 transition-[color,transform] duration-300 hover:text-cream"
                                            >
                                                {social.label}
                                                <ArrowUpRightIcon className="h-3.5 w-3.5"/>
                                            </a>
                                        </li>
                                    </div>
                                ))}
                                <li className="flex flex-row gap-3 items-center">
                                    <div className="w-[30px] h-[30px]">
                                        <GmailSvg/>
                                    </div>
                                    <a
                                        href={`mailto:${site.email}`}
                                        className="inline-block text-cream/75 transition-[color,transform] duration-300 hover:text-cream"
                                    >
                                        {site.email}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Oversized wordmark */}
                <div className="mt-16 select-none overflow-hidden pt-6 sm:mt-20">
                    <p
                        aria-hidden="true"
                        className="font-display text-[15vw] font-extrabold leading-[0.9] tracking-tight text-cream/[0.07] md:text-[10.5rem]"
                    >
                        extropy
                    </p>
                </div>

                <div
                    className="mt-8 flex flex-col gap-2 text-[13px] text-cream-soft sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} extropy — {t("owner")}
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em]">
                        {t("colophon")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
