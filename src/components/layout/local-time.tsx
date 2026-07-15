"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";

function subscribeToClock(onTick: () => void) {
  const interval = setInterval(onTick, 30_000);
  return () => clearInterval(interval);
}

function formatTime(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());
}

/** Live local time in Amersfoort. Server-renders a placeholder to avoid hydration drift. */
export function LocalTime() {
  const locale = useLocale();
  const time = useSyncExternalStore(
    subscribeToClock,
    () => formatTime(locale),
    () => null,
  );

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}
