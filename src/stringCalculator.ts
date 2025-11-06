/**
 * String Calculator
 *
 * Implements a simple string-based number adder with the following features:
 * 1. Returns 0 for an empty string.
 * 2. Supports default delimiters: comma (`,`) and newline (`\n`).
 * 3. Supports custom delimiters defined in the format: `//<delimiter>\n<numbers>`.
 * 4. Throws an error if any negative numbers are included in the input.
 */
export function add(input: string): number {
  // Base case: Return 0 if the input is an empty string
  if (input === "") return 0;

  // Default delimiters are comma (,) and newline (\n)
  let delimiter = /,|\n/;

  // Check for custom delimiter pattern (e.g., "//;\n1;2")
  if (input.startsWith("//")) {
    const parts = input.split("\n"); // Split into ["//;", "1;2"]
    delimiter = new RegExp(parts[0][2]); // Extract custom delimiter, e.g., ";"
    input = parts[1]; // Remainder is the number string
  }

  // Split numbers using the resolved delimiter and convert all to numeric values
  const numbers = input.split(delimiter).map(Number);

  // Detect any negative numbers in the parsed list
  const negatives = numbers.filter((n) => n < 0);

  // Throw an error listing all negative numbers if found
  if (negatives.length)
    throw new Error(`negatives not allowed: ${negatives.join(", ")}`);

  // Sum all valid numbers and return the total
  return numbers.reduce((sum, n) => sum + n, 0);
}
