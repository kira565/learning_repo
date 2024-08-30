//* Given:
// string s
//? Find:
// longest palindrome substrring (mirror string eg aa aba aabbaa/aabaa) curr == prev || prev == next
//! constraints:
// 1 <= s.length <= 1000
// letters | digits

//abwasfaababaaewasvnb
//awaabbaaereer
//zwabcdcbaemwqa

// 1 find small palindrome with condition curr == prev or prev == next aa aba aaa
// 2 then make two pointers and try to expand polindrome  <-- aba -->

function longestPalindrome(s: string): string {
  let longestPalindrome = "";

  function expandPolindrome(
    leftPointer: number,
    rightPointer: number,
    polindrome: string
  ) {
    let currPolindrome = polindrome;
    while (
      s?.[leftPointer] &&
      s?.[rightPointer] &&
      s[leftPointer] === s[rightPointer]
    ) {
      currPolindrome = s[leftPointer] + currPolindrome + s[rightPointer];
      leftPointer--;
      rightPointer++;
    }

    if (currPolindrome.length > longestPalindrome.length) {
      longestPalindrome = currPolindrome;
    }
  }

  for (let i = 1; i < s.length; i++) {
    const curr = s[i];
    const prev = s[i - 1];
    const next = s[i + 1];
    let currPolindrome = "";

    if (prev === next) {
      /// aba aaa
      let leftPointer = i - 2;
      let rightPointer = i + 2;
      currPolindrome = prev + curr + next;
      expandPolindrome(leftPointer, rightPointer, currPolindrome);
    } else if (curr === prev) {
      // aa
      let leftPointer = i - 2;
      let rightPointer = i + 1;
      currPolindrome = curr + prev;
      expandPolindrome(leftPointer, rightPointer, currPolindrome);
    }
  }

  return longestPalindrome;
}
//a4 5a
function longestPalindrome2(s: string): string {
  let longestPalindromeStart = "";
  let longestPalindromeEnd = "";

  let start = 1;
  let end = s.length - 1;

  while (start <= end) {
    // abcba (b b / b) abcba
    const startPolindrome = findPalindrome(start);
    const endPolindrome = findPalindrome(end);

    if (longestPalindromeStart.length < startPolindrome.length) {
      longestPalindromeStart = startPolindrome;
    }

    if (endPolindrome.length < longestPalindromeEnd.length) {
      longestPalindromeEnd = endPolindrome;
    }

    start++;
    end--;
  }

  function findPalindrome(i: number) {
    const curr = s[i];
    const prev = s[i - 1];
    const next = s[i + 1];
    let currPolindrome = "";

    if (prev === next) {
      /// aba aaa
      let leftPointer = i - 2;
      let rightPointer = i + 2;
      currPolindrome = prev + curr + next;
      const polindrome = expandPolindrome(
        leftPointer,
        rightPointer,
        currPolindrome
      );
      if (currPolindrome.length < polindrome.length) {
        currPolindrome = polindrome;
      }
    }
    if (curr === prev) {
      // aa
      let leftPointer = i - 2;
      let rightPointer = i + 1;
      currPolindrome = curr + prev;
      const polindrome = expandPolindrome(
        leftPointer,
        rightPointer,
        currPolindrome
      );
      if (currPolindrome.length < polindrome.length) {
        currPolindrome = polindrome;
      }
    }

    return currPolindrome;
  }

  function expandPolindrome(
    leftPointer: number,
    rightPointer: number,
    polindrome: string
  ) {
    let currPolindrome = polindrome;
    while (
      s?.[leftPointer] &&
      s?.[rightPointer] &&
      s[leftPointer] === s[rightPointer]
    ) {
      currPolindrome = s[leftPointer] + currPolindrome + s[rightPointer];
      leftPointer--;
      rightPointer++;
    }
    return currPolindrome;
  }

  if (longestPalindromeStart === longestPalindromeEnd) {
    return longestPalindromeStart + longestPalindromeEnd;
  } else {
    return longestPalindromeStart.length > longestPalindromeEnd.length
      ? longestPalindromeStart
      : longestPalindromeEnd;
  }
}
