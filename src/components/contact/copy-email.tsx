"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/** Email line with a copy-to-clipboard affordance. */
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
      // Clipboard unavailable — the mailto link next to it still works.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="link-underline break-all font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "cursor-pointer rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300",
          copied
            ? "border-accent bg-accent text-paper"
            : "border-line text-muted hover:border-line-strong hover:text-ink",
        )}
      >
        {copied ? t("copied") : t("copy")}
      </button>
    </div>
  );
}
