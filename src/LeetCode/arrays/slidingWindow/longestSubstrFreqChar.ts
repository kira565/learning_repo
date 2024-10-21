// Longest Substring with At Least K Repeating Characters
// https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/description/

//* Given
// String s
// Integer k

//? Find length of the longest substring where each char frequency is equal or greater than k ("kaaah" - freq of a is 3)

//! Constraits
// 1 <= s.length <= 10^4
// s contains english letters lowercase
// 1 <= k <= 10^4
//aaaabbccccdaa
//ababb // 3
// ababbacdddddeeecc
//adbdadbd
[2, 3, 1, 2, 2];
{
  a: 2;
  b: 3;
}

//ababbc

//! not necessary they go one by one
//TODO too hard for now, not simple sliding window
function longestSubstring(s: string, k: number): number {
  let res = 0;
  const state = new Map<string, number>();
  let left = 0;

  function addToMap(char: string) {
    const val = state.get(char);
    if (val) state.set(char, val + 1);
    else state.set(char, 1);
    return state.get(char);
  }

  for (let right = 0; right < s.length; right++) {
    addToMap(s[right]);
  }

  return res;
}
