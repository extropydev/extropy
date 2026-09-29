export const WORK_SLUGS = [
    "clothes",
    // "dela",
    // "cosmetology",
    // "sushi",
    "saas",
    // "houseDecor",
    "ldStudio",
] as const;

export type WorkSlug = (typeof WORK_SLUGS)[number];

/** Localised body of a case study. */
export interface WorkContent {
    /** Short project type shown as a chip, e.g. "E-commerce". */
    type: string;
    /** One-liner for cards and previews. */
    tagline: string;
    /** Two short paragraphs about the project and the problem it solves. */
    overview: string[];
    /** The features that were actually built. */
    built: Array<{ title: string; body: string }>;
    /** Craft details worth noticing. */
    craft: Array<{ title: string; body: string }>;
    /** Captions keyed by screenshot file base name. */
    captions: Record<string, string>;
    /** Optional honesty note, e.g. placeholder product photos. */
    note?: string;
}

export type WorkDictionary = Record<WorkSlug, WorkContent>;
