import { getTranslations } from "next-intl/server";
import { LotusMark } from "@/components/brand/lotus-mark";
import { ArrowUpRightIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { LocalTime } from "./local-time";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <LotusMark className="h-9 w-12 text-cream" interactive />
            <p className="mt-6 text-balance font-display text-2xl leading-snug text-cream">
              {t("tagline")}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-soft">
              {t("location")} · <LocalTime />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-20">
            <nav aria-label={t("sitemapLabel")}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-soft">
                {t("sitemapLabel")}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {(
                  [
                    { href: "/", key: "home" },
                    { href: "/notes", key: "notes" },
                    { href: "/about", key: "about" },
                    { href: "/contact", key: "contact" },
                  ] as const
                ).map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="link-underline text-cream/85 transition-colors hover:text-cream"
                    >
                      {nav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t("elsewhereLabel")}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-soft">
                {t("elsewhereLabel")}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {site.socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-cream/85 transition-colors hover:text-cream"
                    >
                      <span className="link-underline">{social.label}</span>
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-cream/85 transition-colors hover:text-cream"
                  >
                    {t("emailLabel")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-16 select-none overflow-hidden border-t border-cream/15 pt-10 sm:mt-20">
          <p
            aria-hidden="true"
            className="font-display text-[19vw] font-semibold leading-[0.85] tracking-tight text-cream/[0.09] md:text-[13rem]"
          >
            extropy
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-[13px] text-cream-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} extropy — {t("owner")}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
            {t("colophon")}
          </p>
        </div>
      </div>
    </footer>
  );
}
