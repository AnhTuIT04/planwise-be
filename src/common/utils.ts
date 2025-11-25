function midpoint(a: string, b: string): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const A = a || "";
  const B = b || "";

  let i = 0;
  while (true) {
    const left = A[i]?.charCodeAt(0) ?? 97; // 'a'
    const right = B[i]?.charCodeAt(0) ?? 122; // 'z'

    if (right - left > 1) {
      const mid = Math.floor((left + right) / 2);
      return A.slice(0, i) + String.fromCharCode(mid);
    }

    i++;
  }
}
