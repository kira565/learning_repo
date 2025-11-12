// 238. Product of Array Except Self
// Medium
// Topics
// Companies
// Hint

//? Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
//? The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//? You must write an algorithm that runs in O(n) time and without using the division operation.

// Example 1:

// Input: nums = [1,2,3,4]
// 1,3,6,10
// Output: [24,12,8,6]
// Example 2:

// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]

// Constraints:

// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

function productExceptSelf(nums: number[]): number[] {
  const result: number[] = [];
  const left = [1];
  const right = [1];
  //* 1 2 3 4
  //* l 1 1 2 6
  //* r 24 12 4 1

  for (let i = nums.length; i > 0; i++) {
    const val = right[nums.length - i] * nums[i];
    right.push(val);
  }

  result.push(right[right.length - 1] * left[0]);

  for (let i = 1; i < nums.length - 1; i++) {
    const val = left[i - 1] * nums[i];
    left.push(val);

    result.push(right[right.length - i - 1] * val);

    result;
  }

  return result;
}

// 2 3 4 5 6

// L  1   2   6 24 120

// R 360 120 30 6 1

//   360 240 160 144 120
