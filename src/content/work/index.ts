import type { Locale } from "@/i18n/routing";
import { workEn } from "./en";
import { workNl } from "./nl";
import { workRu } from "./ru";
import { workUk } from "./uk";
import { WORK_SLUGS, type WorkDictionary, type WorkSlug } from "./types";

const dictionaries: Record<Locale, WorkDictionary> = {
  en: workEn,
  nl: workNl,
  ru: workRu,
  uk: workUk,
};

export function getWork(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

export function getCase(locale: Locale, slug: WorkSlug) {
  return getWork(locale)[slug];
}

export function isWorkSlug(value: string): value is WorkSlug {
  return (WORK_SLUGS as readonly string[]).includes(value);
}

export { WORK_SLUGS } from "./types";
export type { WorkContent, WorkDictionary, WorkSlug } from "./types";
export { workImage, workMeta } from "./meta";
