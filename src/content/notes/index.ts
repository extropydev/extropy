import type { Locale } from "@/i18n/routing";
import { notesEn } from "./en";
import { notesNl } from "./nl";
import { notesRu } from "./ru";
import { notesUk } from "./uk";
import { NOTE_SLUGS, type NoteDictionary, type NoteSlug } from "./types";

const dictionaries: Record<Locale, NoteDictionary> = {
  en: notesEn,
  nl: notesNl,
  ru: notesRu,
  uk: notesUk,
};

export function getNotes(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

export function getNote(locale: Locale, slug: NoteSlug) {
  return getNotes(locale)[slug];
}

export function isNoteSlug(value: string): value is NoteSlug {
  return (NOTE_SLUGS as readonly string[]).includes(value);
}

export { NOTE_SLUGS } from "./types";
export type { NoteContent, NoteDictionary, NoteSlug } from "./types";
export { noteMeta } from "./meta";
export { noteSnippets } from "./snippets";
