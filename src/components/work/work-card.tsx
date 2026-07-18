import { getTranslations } from "next-intl/server";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { workImage, workMeta } from "@/content/work/meta";
import type { WorkContent, WorkSlug } from "@/content/work/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { BrowserFrame } from "./browser-frame";

interface WorkCardProps {
  slug: WorkSlug;
  caseData: Pick<WorkContent, "type" | "tagline">;
  /** Wide layout for the flagship project. */
  wide?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * A project as a petal card tinted in the project's own palette.
 * The screenshot leans out of the card bottom and straightens on hover.
 */
export async function WorkCard({
  slug,
  caseData,
  wide = false,
  priority = false,
  className,
}: WorkCardProps) {
  const t = await getTranslations("work");
  const meta = workMeta[slug];
  const dark = meta.dark ?? false;

  return (
    <div
      className={cn(
        "group petal-card petal-bloom relative flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_28px_70px_-30px_rgba(24,23,22,0.4)]",
        meta.surface,
        dark ? "text-cream" : "text-ink",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-1 flex-col gap-8 p-7 sm:p-9",
          wide && "lg:grid lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-12",
        )}
      >
        {/* Text */}
        <div className="flex flex-col items-start">
          <span
            className={cn(
              "petal-chip px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
              dark ? "bg-cream/10 text-cream-soft" : "bg-ink text-paper",
            )}
          >
            {caseData.type}
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {meta.name}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-md text-[15px] leading-relaxed",
              dark ? "text-cream/70" : "text-ink-soft",
            )}
          >
            {caseData.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {meta.stack.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "rounded-[4px] border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em]",
                  dark
                    ? "border-cream/20 text-cream-soft"
                    : "border-ink/15 text-muted",
                )}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${slug}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-[6px] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300",
                dark
                  ? "bg-cream text-ink hover:bg-accent-bright"
                  : "bg-ink text-paper hover:bg-accent",
              )}
            >
              {t("viewCase")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={meta.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${meta.name}: ${t("visitLive")}`}
              className={cn(
                "group/live petal-chip inline-flex items-center gap-2 border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300",
                dark
                  ? "border-cream/25 text-cream hover:border-cream"
                  : "border-ink/20 text-ink hover:border-ink",
              )}
            >
              {t("visitLive")}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Screenshot leaning out of the card */}
        <div className="relative -mb-14 sm:-mb-16">
          <BrowserFrame
            src={workImage(meta.hero)}
            alt={meta.name}
            url={meta.url}
            priority={priority}
            className="translate-y-0 rotate-[0.6deg] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:rotate-0"
          />
        </div>
      </div>
    </div>
  );
}
