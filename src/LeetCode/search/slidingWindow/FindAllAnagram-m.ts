//? Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

//*  Example 1:

// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".

//! Constraints:

// 1 <= s.length, p.length <= 3 * 104
// s and p consist of lowercase English letters.

function findAnagrams(s: string, p: string): number[] {
  const indexArr: number[] = [];
  const anagramLeft = new Map<string, number>();

  //fill anagram
  for (let i = 0; i < p.length; i++) {
    // {s 1 s 3 g 4}
    const val = anagramLeft.get(p[i]);
    if (val === undefined) {
      anagramLeft.set(p[i], -1);
    } else {
      anagramLeft.set(p[i], val - 1);
    }
  }

  function add(char: string) {
    const val = anagramLeft.get(char);
    const newVal = val !== undefined ? val + 1 : 1;
    if (newVal === 0) {
      anagramLeft.delete(char);
    } else anagramLeft.set(char, newVal);
  }

  function remove(char: string) {
    const val = anagramLeft.get(char)!;
    const newVal = val !== undefined ? val - 1 : -1;
    if (newVal === 0) {
      anagramLeft.delete(char);
    } else anagramLeft.set(char, newVal);
  }

  function initNewWindow(startIndex: number) {
    for (let i = startIndex; i < p.length; i++) {
      add(s[i]);
    }
    if (anagramLeft.size === 0) {
      indexArr.push(startIndex);
    }
  }

  //init new
  initNewWindow(0);
  //sliding window window
  for (let i = p.length; i < s.length; i++) {
    remove(s[i - p.length]);
    add(s[i]);

    if (anagramLeft.size === 0) {
      indexArr.push(i - (p.length - 1));
    }
  }

  return indexArr;
}
