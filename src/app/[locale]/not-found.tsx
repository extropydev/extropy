import { useTranslations } from "next-intl";
import { LotusMark } from "@/components/brand/lotus-mark";
import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-36">
      <LotusMark className="h-12 w-16 text-line-strong" />
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-muted">
        {t("label")}
      </p>
      <h1 className="mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
        {t("body")}
      </p>
      <Link
        href="/"
        className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent-deep"
      >
        {t("cta")}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
