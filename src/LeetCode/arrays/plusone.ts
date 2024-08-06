//https://leetcode.com/problems/plus-one/description/
// Given array represents number, return same array
// after +1
// eg [1,2,3,4] ---> [1,2,3,4,5]
// [1,2,3, ]
// [1,2,9,9] ---> [1,3,0,0]
// [9,9,9] ---> [1,0,0,0]
// [1,9,9,9]
// [9]
function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] += 1;
      break;
    } else {
      if (i === 0) {
        digits[i] = 1;
        digits.push(0);
      } else {
        digits[i] = 0;
      }
    }
  }

  return digits;
}
