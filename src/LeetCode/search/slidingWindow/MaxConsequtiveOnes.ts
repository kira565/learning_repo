// 1004. Max Consecutive Ones III
// Medium

//? Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

// Example 1:

// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Output: 6
// Explanation: [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
// Example 2:

// Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
// Output: 10
// Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

// [0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1] k = 0

// Constraints:

// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.
// 0 <= k <= nums.length

function longestOnes(nums: number[], k: number): number {
  let result = 0;
  let windowEndIdx: null | number = null;
  let windowSize = 0;
  let zeroFlips = k;

  //initial window
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      windowSize++;
    } else {
      if (zeroFlips > 0) {
        windowSize++;
        zeroFlips--;
      } else {
        windowEndIdx = i - 1;
        break;
      }
    }
  }

  result = windowSize;

  if (!windowEndIdx) return 0;

  //sliding window
  for (let i = windowEndIdx + 1; i < nums.length; i++) {
    const exitElem = nums[i - windowEndIdx];
    const addedElem = nums[i];
    if (addedElem === 1) {
      // extend
      windowSize++;
    } else {
      //
      if (zeroFlips > 0) {
        //extend
        windowSize++;
        zeroFlips--;
      } else {
        // move
        // 0 1 1 0 1 1 0 0
        if (exitElem === 0) {
          //nothinf
        } else {
          zeroFlips--;
        }
      }
    }

    if (zeroFlips > -1 && windowSize > result) {
      result = windowSize;
    }
  }

  return windowSize;
}
