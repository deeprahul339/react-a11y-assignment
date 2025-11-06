import { describe, it, expect } from "vitest";

import { add } from "./stringCalculator";

describe("String Calculator", () => {
  it("returns 0 for an empty string", () => {
    // Edge case: explicit empty input should yield 0.
    expect(add("")).toBe(0);
  });
  it("returns the number itself for single input", () => {
    expect(add("1")).toBe(1);
  });
  it("returns sum for two comma-separated numbers", () => {
    expect(add("1,5")).toBe(6);
  });
  it("returns sum for multiple comma-separated numbers", () => {
    expect(add("1,2,3")).toBe(6);
  });
  it("supports newlines as delimiters", () => {
    expect(add("1\n2,3")).toBe(6);
  });
});
