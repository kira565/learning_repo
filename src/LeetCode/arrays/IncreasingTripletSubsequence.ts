// 334. Increasing Triplet Subsequence
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

function increasingTriplet(nums: number[]): boolean {
  let start = 0;
  let end = nums.length - 1;
  let mid = null;

  let arr = [];

  while (start < end || (mid !== null && mid < end)) {
    arr[0] = nums[start];
    arr[2] = nums[end];
    if (arr[0] < arr[2]) {
      mid = start + 1;
      if (arr[mid] > arr[0] && arr[mid] < arr[2]) {
        return true;
      } else {
        mid++;
      }
    } else {
      if (nums[start + 1] < nums[start] || nums[end - 1] > nums[end]) {
        if (nums[start + 1] < nums[start]) {
          start++;
        }
        if (nums[end - 1] > nums[end]) {
          end--;
        }
      } else {
        start++;
        end--;
      }
    }
  }

  return false;
}
