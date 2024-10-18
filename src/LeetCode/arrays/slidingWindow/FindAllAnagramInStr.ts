//* Given
// String s
// String p

//? Find all start indexes of p`s anagram in s
//? anagram - word or phrase formed by rearranging letters of a different word or phrase using all letters exactly once

//! Constraits
//1 <= s.length, p.length <= 3 * 104
// english letters lowercased

//Examples
// s = "cbaebabacd", p = "abc"
// Output: [0, 6]; anagrams: cba, bac

function findAnagrams(s: string, p: string): number[] {
  const indexArr: number[] = [];
  const memory = new Map<string, number>();

  //fill anagram
  for (let i = 0; i < p.length; i++) {
    // {s 1 s 3 g 4}
    const val = memory.get(p[i]);
    if (val === undefined) {
      memory.set(p[i], 1);
    } else {
      memory.set(p[i], val + 1);
    }
  }

  function handleMap(i: number) {
    const val = memory.get(s[i]);
    if (val !== undefined) {
      const newVal = val - 1;
      if (newVal > 0) {
        memory.set(s[i], val - 1);
      } else {
        memory.delete(s[i]);
      }
    } else {
    }
  }

  function initNewWindow(startIndex: number) {
    for (let i = startIndex; i < p.length; i++) {
      handleMap(i);
    }
    if (memory.size === 0) {
      indexArr.push(startIndex);
    }
  }

  //init new
  initNewWindow(0);
  //sliding window window
  for (let i = p.length; i < s.length; i++) {
    memory.delete(s[i - p.length]);

    handleMap(i);

    if (memory.size === 0) {
      indexArr.push(i - p.length);
    }
  }

  return indexArr;
}
