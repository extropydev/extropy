import Image from "next/image";
import {cn} from "@/lib/cn";

interface BrowserFrameProps {
    src: string;
    alt: string;
    /** Real page URL shown in the address pill. */
    url?: string;
    priority?: boolean;
    sizes?: string;
    className?: string;
}

/** A screenshot inside a minimal browser chrome, in brand colors. */
export function BrowserFrame({
                                 src,
                                 alt,
                                 url,
                                 priority = false,
                                 sizes = "(min-width: 1024px) 50vw, 100vw",
                                 className,
                             }: BrowserFrameProps) {
    const host = url ? new URL(url).host : null;

    return (
        <figure
            className={cn(
                "overflow-hidden rounded-2xl bg-ink shadow-[0_24px_60px_-30px_rgba(24,23,22,0.5)]",
                className,
            )}
        >
            <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25"/>
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25"/>
          <span className="h-2.5 w-2.5 rounded-full bg-accent-bright/70"/>
        </span>
                {host && (
                    <span
                        className="truncate rounded-md bg-cream/10 px-3 py-1 text-[10px] font-semibold tracking-wide text-cream-soft">
            {host}
          </span>
                )}
            </div>
            <Image
                src={src}
                alt={alt}
                width={1200}
                height={750}
                sizes={sizes}
                priority={priority}
                className="block w-full"
            />
        </figure>
    );
}
