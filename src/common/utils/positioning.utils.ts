const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MIN = 0;
const MAX = ALPHABET.length - 1;

export function midpoint(a: string | null, b: string | null): string {
  if (a === null) a = "";
  if (b === null) b = "";

  let i = 0;
  let prefix = "";

  while (true) {
    const aHas = i < a.length;
    const bHas = i < b.length;
    const aCode = aHas ? ALPHABET.indexOf(a[i]) : MIN;
    const bCode = bHas ? ALPHABET.indexOf(b[i]) : MAX;

    if (aCode === -1 || bCode === -1) throw new Error("Invalid order key character");

    if (bCode - aCode > 1) {
      const mid = Math.floor((aCode + bCode) / 2);
      return prefix + ALPHABET[mid];
    }

    // commit aCode (or MIN if a ended) to prefix and continue
    prefix += ALPHABET[aCode];

    // if both ended at next index, no more info — append middle char
    if (!aHas && !bHas) {
      return prefix + ALPHABET[Math.floor(ALPHABET.length / 2)];
    }

    i++;
  }
}


export function idxToString(idx: number): string {
  const lastChar: string = String.fromCharCode(65 + (idx % 26));
  const prefix: string = idx >= 26 ? "Z".repeat(Math.floor(idx / 26)) : "";
  return prefix + lastChar;
}
