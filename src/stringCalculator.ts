export function add(input: string): number {
  if (input === "") return 0;

  let delimiter = /,|\n/;
  if (input.startsWith("//")) {
    const parts = input.split("\n");
    delimiter = new RegExp(parts[0][2]);
    input = parts[1];
  }

  const numbers = input.split(delimiter).map(Number);

  const negatives = numbers.filter((n) => n < 0);

  if (negatives.length)
    throw new Error(`negatives not allowed: ${negatives.join(", ")}`);

  return numbers.reduce((sum, n) => sum + n, 0);
}
