import { equal } from "./utils";

describe("We can compare using EPSILON", () => {
  it("works", () => {
    expect(equal(4.0, 4.000005)).toBeTruthy();
    expect(equal(4.0, 4.0003)).toBeFalsy();
  });
});
