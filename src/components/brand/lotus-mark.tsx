import { cn } from "@/lib/cn";
import {
  LOTUS_CORE_RADIUS,
  LOTUS_PETAL_PATH,
  LOTUS_PETALS,
  LOTUS_VIEWBOX,
  petalTransform,
} from "./lotus-geometry";

interface LotusMarkProps {
  className?: string;
  /** Adds a gentle petal-breathe animation on group hover. */
  interactive?: boolean;
}

/** The static extropy lotus mark. Color comes from `currentColor`. */
export function LotusMark({ className, interactive = false }: LotusMarkProps) {
  return (
    <svg
      viewBox={LOTUS_VIEWBOX}
      className={cn("fill-current", className)}
      aria-hidden="true"
    >
      {LOTUS_PETALS.map((petal) => (
        <g key={petal.angle} transform={petalTransform(petal)}>
          <path
            d={LOTUS_PETAL_PATH}
            className={cn(interactive && "icon-petal")}
          />
        </g>
      ))}
      <circle r={LOTUS_CORE_RADIUS} />
    </svg>
  );
}
