export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const hashtable1 = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    const val = hashtable1.get(s[i]);
    if (!val) {
      hashtable1.set(s[i], 1);
    } else {
      hashtable1.set(s[i], val + 1);
    }
  }

  for (let i = 0; i < t.length; i++) {
    const val = hashtable1.get(s[i]);
    if (!val) {
      return false;
    } else {
      if (val === 1) {
        hashtable1.delete(s[i]);
      } else {
        hashtable1.set(s[i], val - 1);
      }
    }
  }

  return hashtable1.size === 0;
}
