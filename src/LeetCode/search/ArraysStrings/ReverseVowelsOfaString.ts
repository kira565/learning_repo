// 345. Reverse Vowels of a String
// Easy
// Topics
// Companies
// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

// Example 1:

// Input: s = "IceCreAm"

// ImA

// Output: "AceCreIm"

// Explanation:

// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

// Example 2:

// Input: s = "leetcode"
// Output: "leotcede"
// Constraints:

// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

function reverseVowels(s: string): string {
  let result = s.split("");
  let pointerA = 0;
  let pointerB = s.length - 1;
  const vowelSet = new Set(["a", "e", "i", "o", "u"]);

  while (pointerA <= pointerB) {
    if (vowelSet.has(s[pointerA]) && vowelSet.has(s[pointerB])) {
      const temp = result[pointerA];

      result[pointerA] = result[pointerB];
      result[pointerB] = temp;

      pointerA++;
      pointerB--;
    }

    if (!vowelSet.has(s[pointerA])) {
      pointerA++;
    }
    if (!vowelSet.has(s[pointerB])) {
      pointerB--;
    }
  }

  return result.join("");
}
