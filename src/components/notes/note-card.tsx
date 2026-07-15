import { ArrowUpRightIcon } from "@/components/icons";
import { noteMeta } from "@/content/notes/meta";
import type { NoteContent, NoteSlug } from "@/content/notes/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

interface NoteCardProps {
  slug: NoteSlug;
  index: number;
  note: Pick<NoteContent, "title" | "tagline">;
  /** Featured cards get a bigger, horizontal layout on wide screens. */
  featured?: boolean;
  className?: string;
}

/**
 * A field note as a petal-shaped card: sharp/round corners like a leaf,
 * blooming open on hover. Ghost numeral sits behind the content.
 */
export function NoteCard({
  slug,
  index,
  note,
  featured = false,
  className,
}: NoteCardProps) {
  const meta = noteMeta[slug];
  const Icon = meta.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/notes/${slug}`}
      className={cn(
        "group petal-card petal-bloom relative flex flex-col overflow-hidden bg-paper-raised p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgba(24,23,22,0.35)] sm:p-9",
        className,
      )}
    >
      {/* Ghost numeral */}
      <span
        aria-hidden="true"
        className="text-hollow pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-extrabold leading-none sm:text-[8.5rem]"
      >
        {number}
      </span>

      <span className="petal-chip relative flex h-14 w-14 items-center justify-center bg-ink text-cream transition-colors duration-500 group-hover:bg-accent">
        <Icon className="h-7 w-7" />
      </span>

      <span
        className={cn(
          "relative mt-6 block font-display font-bold leading-snug tracking-tight text-ink",
          featured ? "max-w-md text-xl sm:text-2xl" : "text-lg sm:text-xl",
        )}
      >
        {note.title}
      </span>
      <span className="relative mt-3 block max-w-md text-sm leading-relaxed text-muted">
        {note.tagline}
      </span>

      <span className="relative mt-auto flex items-end justify-between gap-4 pt-7">
        <span className="flex flex-wrap gap-1.5">
          {meta.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-[4px] border border-line-strong/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-muted"
            >
              {tech}
            </span>
          ))}
        </span>
        <span className="petal-chip flex h-9 w-9 shrink-0 items-center justify-center border border-line-strong text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
          <ArrowUpRightIcon className="h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}
