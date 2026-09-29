export const LOTUS_VIEWBOX = "-54 -64 108 84";

export const LOTUS_CORE_RADIUS = 8;

export const LOTUS_PETAL_PATH =
  "M0 0 C -12 -10, -15 -30, 0 -44 C 15 -30, 12 -10, 0 0 Z";

export interface LotusPetal {
  /** Rotation from vertical, degrees. Ordered left → right. */
  angle: number;
  /** Relative petal size. */
  scale: number;
}

export const LOTUS_PETALS: LotusPetal[] = [
  { angle: -96, scale: 0.62 },
  { angle: -48, scale: 0.95 },
  { angle: 0, scale: 1.05 },
  { angle: 48, scale: 0.95 },
  { angle: 96, scale: 0.62 },
];

export function petalTransform(petal: LotusPetal) {
  return `rotate(${petal.angle}) translate(0 -12) scale(${petal.scale})`;
}
