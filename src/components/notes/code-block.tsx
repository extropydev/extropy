interface CodeBlockProps {
  code: string;
  file: string;
  lang: string;
}

/** Dark code card in brand colors. Code uses the system mono stack. */
export function CodeBlock({ code, file, lang }: CodeBlockProps) {
  return (
    <figure className="petal-card-sm overflow-hidden bg-ink text-cream">
      <figcaption className="flex items-center justify-between gap-4 px-5 py-3.5">
        <span className="flex items-center gap-2.5 truncate">
          <svg
            viewBox="0 0 10 12"
            className="h-2.5 w-2 shrink-0 fill-accent-bright"
            aria-hidden="true"
          >
            <path d="M5 12 C 1.5 9.5, 1 4, 5 0 C 9 4, 8.5 9.5, 5 12 Z" />
          </svg>
          <span className="truncate font-mono text-xs text-cream-soft">
            {file}
          </span>
        </span>
        <span className="rounded-[4px] bg-cream/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cream-soft">
          {lang}
        </span>
      </figcaption>
      <div className="overflow-x-auto border-t border-cream/10">
        <pre className="px-5 py-5 font-mono text-[13px] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
