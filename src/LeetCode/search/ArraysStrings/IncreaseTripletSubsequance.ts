// 334. Increasing Triplet Subsequence
// Attempted
// Medium
// Topics
// Companies
// Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

// Example 1:

// Input: nums = [1,2,3,4,5]
// Output: true
// Explanation: Any triplet where i < j < k is valid.
// Example 2:

// Input: nums = [5,4,3,2,1]
// Output: false
// Explanation: No triplet exists.
// Example 3:

// Input: nums = [2,1,5,0,4,6]
// Output: true
// Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

// Constraints:

// 1 <= nums.length <= 5 * 105
// -231 <= nums[i] <= 231 - 1

// Follow up: Could you implement a solution that runs in O(n) time complexity and O(1) space complexity?

// 54   34

function increasingTriplet(nums: number[]): boolean {
  // 20, 100
  // 10, 12, 13
  // 5
  let memory: number[] = [];
  let tempFirst = null;

  for (let i = 0; i < nums.length; i++) {
    if (memory.length === 2 && nums[i] > memory[1]) {
      return true;
    } else if (tempFirst === null || tempFirst > nums[i]) {
      tempFirst = nums[i];
    } else {
      if (nums[i] > tempFirst) {
        memory[0] = tempFirst;
        memory[1] = nums[i];
        tempFirst === null;
      }
    }
  }

  return false;
}
// [20,100,10,12,5,13]

//

// 10 12 13
