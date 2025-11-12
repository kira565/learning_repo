// 1456. Maximum Number of Vowels in a Substring of Given Length
// https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/

//? Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.
//? Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

// *  Example 1:

// Input: s = "abciiidef", k = 3
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.

//! Constraints:

// 1 <= s.length <= 105
// s consists of lowercase English letters.
// 1 <= k <= s.length

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
