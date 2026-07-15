export const NOTE_SLUGS = [
  "payments",
  "auth",
  "cart",
  "responsive",
  "performance",
] as const;

export type NoteSlug = (typeof NOTE_SLUGS)[number];

/** Localised body of a field note. */
export interface NoteContent {
  title: string;
  /** One-liner shown on cards and previews. */
  tagline: string;
  /** The client's fear, in their own words. Rendered as a pull quote. */
  worry: string;
  reality: {
    heading: string;
    body: string[];
  };
  approach: {
    heading: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  code: {
    caption: string;
  };
  bottomLine: {
    heading: string;
    body: string;
  };
}

export type NoteDictionary = Record<NoteSlug, NoteContent>;
