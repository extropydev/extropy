import type { ComponentType } from "react";
import {
  AuthIcon,
  CartIcon,
  PaymentsIcon,
  PerformanceIcon,
  ResponsiveIcon,
} from "@/components/icons";
import type { NoteSlug } from "./types";

interface NoteMeta {
  icon: ComponentType<{ className?: string }>;
  /** Technologies the note's approach leans on. Not localised. */
  stack: string[];
  /** Language of the code sample, for the snippet header. */
  codeLang: string;
  codeFile: string;
}

export const noteMeta: Record<NoteSlug, NoteMeta> = {
  payments: {
    icon: PaymentsIcon,
    stack: ["Stripe", "Webhooks", "Drizzle ORM"],
    codeLang: "ts",
    codeFile: "app/api/stripe/webhook/route.ts",
  },
  auth: {
    icon: AuthIcon,
    stack: ["Supabase Auth", "Row Level Security", "Proxy guards"],
    codeLang: "sql",
    codeFile: "policies/orders.sql",
  },
  cart: {
    icon: CartIcon,
    stack: ["Zustand", "React Query", "Server revalidation"],
    codeLang: "ts",
    codeFile: "stores/cart.ts",
  },
  responsive: {
    icon: ResponsiveIcon,
    stack: ["Tailwind CSS", "Container queries", "Fluid type"],
    codeLang: "css",
    codeFile: "styles/scale.css",
  },
  performance: {
    icon: PerformanceIcon,
    stack: ["Server Components", "Streaming", "Next.js cache"],
    codeLang: "tsx",
    codeFile: "app/products/[slug]/page.tsx",
  },
};
