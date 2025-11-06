import { describe, it, expect } from "vitest";

import { add } from "./stringCalculator";

describe("String Calculator", () => {
  it("returns 0 for an empty string", () => {
    // Edge case: explicit empty input should yield 0.
    expect(add("")).toBe(0);
  });
});
