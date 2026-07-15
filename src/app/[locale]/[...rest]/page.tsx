import { notFound } from "next/navigation";

/** Funnels every unknown localized path into the localized 404 page. */
export default function CatchAllPage() {
  notFound();
}
