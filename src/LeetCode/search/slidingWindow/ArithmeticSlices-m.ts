// An integer array is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

// For example, [1,3,5,7,9], [7,7,7,7], and [3,-1,-5,-9] are arithmetic sequences.
// Given an integer array nums, return the number of arithmetic subarrays of nums.

// A subarray is a contiguous subsequence of the array.

// Example 1:
// Input: nums = [1,2,3,4]
// Output: 3
// Explanation: We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4] and [1,2,3,4] itself.

// [1,2,3,4,5,6] // 123, 234, 345, 456, 1234, 2345, 3456, 12345, 23456, 123456

// 123, 1234, 12345, 123456
// 234, 2345, 23456
// 345, 3456
// 456

// 123 1234
// 234

// 123 1234 12345
// 234 2345
// 345

// Example 2:
// Input: nums = [1]
// Output: 0

// Constraints:

// 1 <= nums.length <= 5000
// -1000 <= nums[i] <= 1000

function numberOfArithmeticSlices(nums: number[]): number {
  let slices = 0;
  const minSize = 3;

  function window() {
    let length = 0;
    let diff: number | null = null;
    let prev: number | null = null;

    return {
      add(num: number) {
        if (prev === null) {
          prev = num;
          length++;
          return;
        }

        if (diff === null) {
          diff = num - prev;
          length++;
          return;
        } else {
          const curDif = num - prev;
          if (curDif === diff) {
            length++;
          }
        }
      },
    };
  }

  //initial window
  for (let i = 0; i < minSize; i++) {}

  //sliding
  for (let i = minSize; i < nums.length; i++) {}

  return slices;
}
