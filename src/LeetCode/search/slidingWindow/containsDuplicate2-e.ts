//Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

// Example 1:

// Input: nums = [1,2,3,1], k = 3
// Output: true

// Example 2:

// Input: nums = [1,0,1,1], k = 1
// Output: true

// Example 3:

// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false

// Constraints:

// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109
// 0 <= k <= 105
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const windowSize = k + 1;
  const memory = new Map<number, number>();

  function proceedNumber(num: number, index: number) {
    const val = memory.get(num);
    if (val) {
      return true;
    } else {
      memory.set(num, index);
      return false;
    }
  }

  // initial window
  for (let i = 0; i < windowSize; i++) {
    const value = proceedNumber(nums[i], i);
    if (value === true) return true;
  }

  //sliding window
  for (let i = windowSize; i < nums.length; i++) {
    //remove start
    memory.delete(i - windowSize);

    //add new
    const value = proceedNumber(nums[i], i);
    if (value === true) return true;
  }

  return false;
}
