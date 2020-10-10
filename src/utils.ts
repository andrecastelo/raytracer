const EPSILON = 0.00001;

export function equal(a: number, b: number): boolean {
  return Math.abs(a - b) < EPSILON;
}
