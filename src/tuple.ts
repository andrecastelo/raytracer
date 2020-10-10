import { assert } from "console";
import { equal } from "./utils";

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
    throw "Cannot add two points";
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
