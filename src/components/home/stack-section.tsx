import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

interface StackItem {
  name: string;
  role: string;
  why: string;
}

export async function StackSection() {
  const t = await getTranslations("home.stack");
  const items = t.raw("items") as StackItem[];

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionLabel className="text-muted">{t("label")}</SectionLabel>
          <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
            {t("intro")}
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.name}
                className="group bg-paper p-6 transition-colors duration-300 last:col-span-full hover:bg-paper-raised sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {item.role}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.why}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
