interface CodeBlockProps {
  code: string;
  file: string;
  lang: string;
}

/** Dark code card in brand colors — no highlighter dependency. */
export function CodeBlock({ code, file, lang }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink bg-ink text-cream">
      <figcaption className="flex items-center justify-between gap-4 border-b border-cream/10 px-5 py-3">
        <span className="truncate font-mono text-xs text-cream-soft">
          {file}
        </span>
        <span className="rounded-full border border-cream/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream-soft">
          {lang}
        </span>
      </figcaption>
      <div className="overflow-x-auto">
        <pre className="px-5 py-5 font-mono text-[13px] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
