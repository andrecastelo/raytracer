import { equal } from './utils';

/**
 * This will be our basic work horse. I decided to use an array as opposed
 * to an object because we could use functions instead of methods.
 *
 * Plus we get to use map(), every(), and reduce(), which is pretty neat.
 */
export type Tuple = [number, number, number, number];

export function point(x: number, y: number, z: number): Tuple {
  return [x, y, z, 1.0];
}

export function vector(x: number, y: number, z: number): Tuple {
  return [x, y, z, 0.0];
}

export function equalTuples(a: Tuple, b: Tuple) {
  return a.every((value, index) => equal(value, b[index]));
}

export function addTuples(a: Tuple, b: Tuple): Tuple {
  const w = a[3] + b[3];

  if (w > 1) {
    throw 'Cannot add two points';
  }

  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

export function subTuples(a: Tuple, b: Tuple): Tuple {
  const w = Math.max(a[3] - b[3], 0);

  return [a[0] - b[0], a[1] - b[1], a[2] - b[2], w];
}

export function negateVector(a: Tuple): Tuple {
  return subTuples(vector(0, 0, 0), a);
}

export function negate(a: Tuple): Tuple {
  return <Tuple>a.map((x) => -x);
}

export function multiply(a: Tuple, scalar: number): Tuple {
  return <Tuple>a.map((value) => value * scalar);
}

export function divide(a: Tuple, scalar: number): Tuple {
  return <Tuple>a.map((value) => value / scalar);
}

/**
 * The vector is a value that encodes both direction and distance. The
 * distance is the magnitude (or length).
 *
 * @param a vector
 */
export function magnitude(a: Tuple): number {
  return Math.sqrt(a.reduce((total, value) => total + Math.pow(value, 2), 0));
}

/**
 * Normalization is the process of taking an arbitrary vector and converting
 * it into a unitvector. It will keep our calculations anchored relative
 * to a common scale (the unit vector).
 *
 * @param a vector
 */
export function normalize(a: Tuple): Tuple {
  const m = magnitude(a);

  return <Tuple>a.map((value) => value / m);
}

/**
 * The dot product can feel pretty abstract, but there's one quick way to
 * internalize it: the smaller the dot product, the larger the angle
 * between the vectors.
 *
 * @param a vector
 * @param b vector
 */
export function dot(a: Tuple, b: Tuple): number {
  return a.reduce((total, _, index) => total + a[index] * b[index], 0);
}

/**
 * The cross product is a vector operation, but instead of the dot product, we
 * this function returns another vector, perpendicular to both of the original
 * vecrtors. It will not work with regular tuples.
 *
 * @param v1 vector
 * @param v2 vector
 */
export function cross(v1: Tuple, v2: Tuple): Tuple {
  const a = { x: v1[0], y: v1[1], z: v1[2] };
  const b = { x: v2[0], y: v2[1], z: v2[2] };

  return vector(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
}
