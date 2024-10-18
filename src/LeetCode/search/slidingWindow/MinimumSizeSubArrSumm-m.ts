// 209. Minimum Size Subarray Sum
//https://leetcode.com/problems/minimum-size-subarray-sum/description/

//?  Given an array of positive integers nums and a positive integer target, return the minimal length of a
//? subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:

// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
// Example 2:

// Input: target = 4, nums = [1,4,4]
// Output: 1
// Example 3:

// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

// Constraints:

// 1 <= target <= 109
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 104

// 11, [1, 2, 3, 4, 5]

function minSubArrayLen(target: number, nums: number[]): number {
  // сначала ищем хоть какое то окно, затем когда нашли уменьшаем его на 1 слева и идем дальше
  let result = 0;
  let windowSize = 0;
  let currentSum = 0;
  let windowDecrease = 0;

  function makeWindowSmallerBy1(index: number) {
    currentSum -= nums[index];
    windowDecrease++;
  }

  //make initial window
  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    windowSize++;
    if (currentSum >= target) {
      result = windowSize;
      makeWindowSmallerBy1(0);
      break;
    }
  }

  //sliding
  for (
    let i = windowSize;
    i < nums.length ||
    (i - windowSize - windowDecrease < nums.length && currentSum >= target);
    i++
  ) {
    const currentWindowSize = windowSize - windowDecrease;

    if (nums[i]) {
      currentSum += nums[i]; // add new
    }

    currentSum -= nums[i - currentWindowSize];

    if (currentSum >= target) {
      result = currentWindowSize;
      makeWindowSmallerBy1(i - currentWindowSize + 1);
    }
  }

  return result;
}
