"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/** Email line with a copy-to-clipboard affordance. Styled for a dark surface. */
export function CopyEmail({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // no clipboard access, mailto link still works
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <a
        href={`mailto:${email}`}
        className="break-all font-display text-xl font-bold tracking-tight text-cream transition-colors hover:text-accent-bright sm:text-3xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "cursor-pointer rounded-[6px] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300",
          copied
            ? "bg-accent-bright text-ink"
            : "bg-cream/10 text-cream hover:bg-cream/20",
        )}
      >
        {copied ? t("copied") : t("copy")}
      </button>
    </div>
  );
}
