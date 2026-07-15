import { getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";

/** Closing call-to-action band, shared by several pages. */
export async function ContactCta() {
  const t = await getTranslations("cta");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
      <div className="petal-card relative overflow-hidden bg-accent-deep px-7 py-16 text-center text-cream sm:px-12 sm:py-24">
        {/* Two faint petals anchoring the corners */}
        <svg
          viewBox="0 0 10 12"
          className="pointer-events-none absolute -left-6 -top-8 h-40 w-32 rotate-[24deg] fill-cream/[0.06]"
          aria-hidden="true"
        >
          <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
        </svg>
        <svg
          viewBox="0 0 10 12"
          className="pointer-events-none absolute -bottom-10 -right-4 h-44 w-36 -rotate-[18deg] fill-cream/[0.06]"
          aria-hidden="true"
        >
          <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
        </svg>

        <Reveal>
          <h2 className="relative mx-auto max-w-2xl text-balance font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-cream/70">
            {t("body")}
          </p>
          <div className="relative mt-9 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-[6px] bg-cream px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-300 hover:bg-paper"
            >
              {t("button")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
