//* Given string s
// * Given integer k
//? return the max number of vowels in substring with length k

// * Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

//! constraints:
// 1 <= s.length <= 10^5
// s - lovercase eng letters
// 1 <= k <= s.length

// "ababavvaaa"
/// "bbbbaaabb"

function maxVowels(s: string, k: number): number {
  let summ = 0;
  let res = 0;
  const vowelSet = new Set(["a", "e", "i", "o", "u"]);

  for (let i = 0; i < s.length; i++) {
    if (i > k - 1) {
      if (vowelSet.has(s[i - k])) summ--;
    }
    if (vowelSet.has(s[i])) summ++;

    if (res < summ) res = summ;
  }

  return res;
}

// * My solution time complexity O(n), Memory O(1)
