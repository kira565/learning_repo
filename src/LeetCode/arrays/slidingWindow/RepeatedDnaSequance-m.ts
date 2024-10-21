function findRepeatedDnaSequences(s: string): string[] {
  if (s.length < 10) return [];
  const result = new Set<string>();
  const existing = new Set<string>();
  let currentStr = "";
  const capacity = 10;

  for (let i = 0; i < capacity; i++) {
    currentStr += s[i];
  }
  existing.add(currentStr);

  for (let i = capacity; i < s.length; i++) {
    currentStr = currentStr.slice(i + 1, i + 1 + 10);
    if (existing.has(currentStr)) {
      result.add(currentStr);
    } else {
      existing.add(currentStr);
    }
  }

  return Array.from(result);
}
