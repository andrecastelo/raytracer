import {
  Tuple,
  vector,
  point,
  addTuples,
  subTuples,
  equalTuples,
  negateVector,
  negate,
  multiply,
  divide,
  magnitude,
  normalize,
  dot,
  cross,
} from './tuple';

describe('Tuples are arrays with 4 numbers', () => {
  it('point() creates a point with w = 1', () => {
    expect(point(4, -4, 3)).toEqual([4, -4, 3, 1.0]);
  });

  it('vector() creates a vector with w = 0', () => {
    expect(vector(4, -4, 3)).toEqual([4, -4, 3, 0.0]);
  });

  it('equalTuples() returns if tuples are equal', () => {
    const a: Tuple = [1.0, 2.0, 3.0, 1.0];
    const b: Tuple = [1.000005, 1.999995, 2.9999998, 1.0];
    const c: Tuple = [1.0, 2.0, 3.02, 1.0];

    expect(equalTuples(a, b)).toBeTruthy();
    expect(equalTuples(a, c)).toBeFalsy();
  });

  it('addTuples() add tuples properly', () => {
    const a: Tuple = point(3, -2, 5);
    const b: Tuple = vector(-2, 3, 1);
    const final: Tuple = point(1, 1, 6);

    expect(equalTuples(addTuples(a, b), final)).toBeTruthy();
  });

  it('addTuples() cannot add two points', () => {
    const a: Tuple = point(1, 2, 3);
    const b: Tuple = point(3, 2, 1);

    expect(() => addTuples(a, b)).toThrow();
  });

  it('subTuples() can subtract two points', () => {
    const a = point(3, 2, 1);
    const b = point(5, 6, 7);
    const expected = vector(-2, -4, -6);

    expect(equalTuples(subTuples(a, b), expected)).toBeTruthy();
  });

  it('subTuples() can subtract a vector from a point', () => {
    const p = point(3, 2, 1);
    const v = vector(5, 6, 7);

    expect(equalTuples(subTuples(p, v), point(-2, -4, -6))).toBeTruthy();
  });

  it('subTuples() can subtract two vectors', () => {
    const v1 = vector(3, 2, 1);
    const v2 = vector(5, 6, 7);

    expect(equalTuples(subTuples(v1, v2), vector(-2, -4, -6))).toBeTruthy();
  });

  it('Subtracting a vector from the zero vector', () => {
    const v = vector(1, -2, 3);

    expect(equalTuples(negateVector(v), vector(-1, 2, -3))).toBeTruthy();
  });

  it('Negating a tuple', () => {
    const tuple: Tuple = [1, -2, 3, -4];
    expect(equalTuples(negate(tuple), <Tuple>[-1, 2, -3, 4])).toBeTruthy();
  });

  it('Scalar multiplication and division', () => {
    const a: Tuple = [1, -2, 3, -4];

    expect(
      equalTuples(multiply(a, 3.5), <Tuple>[3.5, -7, 10.5, -14])
    ).toBeTruthy();

    expect(
      equalTuples(multiply(a, 0.5), <Tuple>[0.5, -1, 1.5, -2])
    ).toBeTruthy();

    expect(equalTuples(divide(a, 2), <Tuple>[0.5, -1, 1.5, -2])).toBeTruthy();
  });

  it('Computing the magnitudes', () => {
    expect(magnitude(vector(1, 0, 0))).toEqual(1);
    expect(magnitude(vector(0, 1, 0))).toEqual(1);
    expect(magnitude(vector(0, 0, 1))).toEqual(1);

    expect(magnitude(vector(1, 2, 3))).toEqual(Math.sqrt(14));
    expect(magnitude(vector(-1, -2, -3))).toEqual(Math.sqrt(14));
  });

  it('Normalize', () => {
    expect(normalize(vector(4, 0, 0))).toEqual(vector(1, 0, 0));

    const v = vector(1, 2, 3);
    expect(
      equalTuples(normalize(v), vector(0.26726, 0.53452, 0.80178))
    ).toBeTruthy();
  });

  it('Dot product', () => {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);

    expect(dot(a, b)).toEqual(20);

    expect(dot(vector(1, 0, 0), vector(1, 0, 0))).toEqual(1);
    expect(dot(vector(1, 0, 0), vector(-1, 0, 0))).toEqual(-1);
  });

  it('Cross product', () => {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);

    expect(cross(a, b)).toEqual(vector(-1, 2, -1));
    expect(cross(b, a)).toEqual(vector(1, -2, 1));
  });
});
