import type {WorkSlug} from "./types";

interface WorkMeta {
    name: string;
    url: string;
    stack: string[];
    hero: string;
    shots: string[];
    flagship?: boolean;
    dark?: boolean;
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
    dela: {
        name: "Dela Clothes",
        url: "https://dela-clothes.vercel.app/",
        stack: ["Next.js", "Tailwind.css", "Zustand"],
        hero: "dela-home",
        shots: ["dela-catalog", "dela-produc"],
        flagship: true,
        surface: "bg-[#ffe5ec]",
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
    houseDecor: {
        name: "House Decor Store",
        url: "https://house-decor-nu.vercel.app/",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        hero: "decor-home",
        shots: ["decor-catalog", "decor-product-page", "decor-about"],
        flagship: true,
        surface: "bg-[#faedcd]",
    },
    ldStudio: {
        name: "L-D Studio",
        url: "https://l-d.studio/",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        hero: "ld-home",
        shots: ["ld-before-after", "ld-how-work"],
        dark: true,
        flagship: true,
        surface: "bg-ink",
    },
};

export function workImage(base: string) {
    return `/work/${base}.webp`;
}
