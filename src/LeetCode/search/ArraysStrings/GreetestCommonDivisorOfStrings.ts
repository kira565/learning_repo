// 1071. Greatest Common Divisor of Strings
// Easy
// Topics
// Companies
// Hint
// For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

// Example 1:
// Input: str1 = "ABCABC", str2 = "ABC"
// Output: "ABC"

// Example 2:
// Input: str1 = "ABABAB", str2 = "ABAB"
// Output: "AB"

// Example 3:
// Input: str1 = "LEET", str2 = "CODE"
// Output: ""

// Constraints:

// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of English uppercase letters.

// ABCDEF
// ABC

//NLZGMNLZGMNLZGMNLZGMNLZGMNLZGMNLZGMNLZGM // 25 / 5 = 5
//NLZGMNLZGMNLZGMNLZGMNLZGMNLZGMNLZGMNLZGMNLZGM // 9 nlgzm

// "NLZGM"

function gcdOfStrings(str1: string, str2: string): string {
  let res = "";
  let largestStr;
  let smallestStr;

  if (str1.length > str2.length) {
    largestStr = str1;
    smallestStr = str2;
  } else {
    largestStr = str2;
    smallestStr = str1;
  }

  function cod(largest: number, smallest: number) {
    let result = largest / smallest;
    for (
      let ostatok = largest % smallest;
      ostatok !== 0;
      ostatok = largest % smallest
    ) {
      result = ostatok;
      largest = smallest;
      smallest = ostatok;
    }
    return result;
  }

  const codRes = cod(largestStr.length, smallestStr.length);

  for (let i = 0; i < largestStr.length; i + codRes) {
    const firstSubstr = str1.slice(i, i + codRes);
    const secondSubst = str2.slice(i, i + codRes);
    if (!res && firstSubstr && secondSubst && firstSubstr === secondSubst) {
      res = firstSubstr;
    }

    if (firstSubstr && firstSubstr !== res) {
      res = "";
    }

    if (secondSubst && secondSubst !== res) {
      res = "";
    }
  }

  return res;
}
