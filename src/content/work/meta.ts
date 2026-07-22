import type {WorkSlug} from "./types";

interface WorkMeta {
    /** Project brand name, shown as-is in every locale. */
    name: string;
    url: string;
    stack: string[];
    /** Hero screenshot base name inside /public/work. */
    hero: string;
    /** Additional screenshots for the case gallery. */
    shots: string[];
    /** Biggest, most complete project; gets the wide card. */
    flagship?: boolean;
    /** Dark-themed presentation (sushi). */
    dark?: boolean;
    /** Card surface classes per project, tinted after its own palette. */
    surface: string;
}

export const workMeta: Record<WorkSlug, WorkMeta> = {
    clothes: {
        name: "Fashion Outlet",
        url: "https://e-commerce-cloth-kappa.vercel.app/",
        stack: ["Next.js", "Supabase", "Drizzle", "Stripe", "Zustand", "React Query"],
        hero: "clothes-home",
        shots: ["clothes-catalog", "clothes-auth"],
        flagship: true,
        surface: "bg-paper-raised",
    },
    cosmetology: {
        name: "Lumé Studio",
        url: "https://cosmetology-gamma.vercel.app/",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
        hero: "cosmetology-home",
        shots: ["cosmetology-booking", "cosmetology-results"],
        surface: "bg-[#f6e8e0]",
    },
    sushi: {
        name: "Golden Fish",
        url: "https://sushi-website-prototype.vercel.app/",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
        hero: "sushi-home",
        shots: ["sushi-menu", "sushi-story"],
        dark: true,
        surface: "bg-ink",
    },
    saas: {
        name: "SaaS Landing",
        url: "https://saaslandingpage-tau.vercel.app/",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        hero: "saas-home",
        shots: ["saas-map"],
        surface: "bg-[#eceafb]",
    },
    // houseDecor: {
    //     name: "House Decor Store",
    //     url: "https://saaslandingpage-tau.vercel.app/",
    //     stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    //     hero: "house decor hero page",
    //     shots: ["test"],
    //     surface: "bg-[#eceafb]",
    // }

};

export function workImage(base: string) {
    return `/work/${base}.webp`;
}
