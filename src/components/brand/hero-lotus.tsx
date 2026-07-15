"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  LOTUS_CORE_RADIUS,
  LOTUS_PETAL_PATH,
  LOTUS_PETALS,
  LOTUS_VIEWBOX,
  petalTransform,
} from "./lotus-geometry";

const BLOOM_EASE = [0.22, 1, 0.36, 1] as const;

interface HeroLotusProps {
  className?: string;
}

/**
 * The lotus mark blooming in: petals unfold from the core one by one,
 * then the whole flower keeps a barely perceptible breath.
 */
export function HeroLotus({ className }: HeroLotusProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox={LOTUS_VIEWBOX}
      className={className}
      aria-hidden="true"
      animate={reducedMotion ? undefined : { scale: [1, 1.015, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      {LOTUS_PETALS.map((petal, index) => (
        <g key={petal.angle} transform={petalTransform(petal)}>
          <motion.path
            d={LOTUS_PETAL_PATH}
            fill="currentColor"
            initial={
              reducedMotion ? false : { opacity: 0, scale: 0.35, y: 6 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25 + index * 0.12,
              ease: BLOOM_EASE,
            }}
            style={{ transformOrigin: "0px 0px" }}
          />
        </g>
      ))}
      <motion.circle
        r={LOTUS_CORE_RADIUS}
        fill="currentColor"
        initial={reducedMotion ? false : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: BLOOM_EASE }}
      />
    </motion.svg>
  );
}
