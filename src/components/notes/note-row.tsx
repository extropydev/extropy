import { ArrowUpRightIcon } from "@/components/icons";
import { noteMeta } from "@/content/notes/meta";
import type { NoteContent, NoteSlug } from "@/content/notes/types";
import { Link } from "@/i18n/navigation";

interface NoteRowProps {
  slug: NoteSlug;
  index: number;
  note: Pick<NoteContent, "title" | "tagline">;
}

/** One entry in the field-notes ledger. */
export function NoteRow({ slug, index, note }: NoteRowProps) {
  const meta = noteMeta[slug];
  const Icon = meta.icon;

  return (
    <Link
      href={`/notes/${slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 border-b border-line px-2 py-7 transition-colors duration-300 first:border-t hover:bg-paper-raised sm:grid-cols-[3rem_3.5rem_1fr_auto] sm:gap-x-8 sm:px-4"
    >
      <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="hidden h-14 w-14 items-center justify-center rounded-xl border border-line bg-paper text-ink transition-colors duration-300 group-hover:border-accent group-hover:text-accent sm:flex">
        <Icon className="h-7 w-7" />
      </span>

      <span className="min-w-0">
        <span className="block font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
          {note.title}
        </span>
        <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-muted">
          {note.tagline}
        </span>
        <span className="mt-3 flex flex-wrap gap-1.5">
          {meta.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {tech}
            </span>
          ))}
        </span>
      </span>

      <ArrowUpRightIcon className="h-5 w-5 justify-self-end text-muted transition-colors group-hover:text-ink" />
    </Link>
  );
}
