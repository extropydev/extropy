import type { MetadataRoute } from "next";
import { NOTE_SLUGS } from "@/content/notes/types";
import { WORK_SLUGS } from "@/content/work/types";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

const PATHS = [
  "",
  "/work",
  ...WORK_SLUGS.map((slug) => `/work/${slug}`),
  "/notes",
  ...NOTE_SLUGS.map((slug) => `/notes/${slug}`),
  "/about",
  "/contact",
];

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${site.url}${prefix}${path}` || site.url;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
      ),
    },
  }));
}
