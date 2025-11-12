// 1679. Max Number of K-Sum Pairs
// Medium

//? You are given an integer array nums and an integer k.
//? In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.
//? Return the maximum number of operations you can perform on the array.

// Example 1:
// Input: nums = [1,2,3,4], k = 5
// Output: 2
// Explanation: Starting with nums = [1,2,3,4]:
// - Remove numbers 1 and 4, then nums = [2,3]
// - Remove numbers 2 and 3, then nums = []
// There are no more pairs that sum up to 5, hence a total of 2 operations.

// Example 2:
// Input: nums = [3,1,3,4,3], k = 6
// Output: 1
// Explanation: Starting with nums = [3,1,3,4,3]:
// - Remove the first two 3's, then nums = [1,4,3]
// There are no more pairs that sum up to 6, hence a total of 1 operation.

// Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 1 <= k <= 109

function maxOperations(nums: number[], k: number): number {
  let operations = 0;
  const hashMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const val = hashMap.get(nums[i]);

    if (val !== undefined) {
      operations++;

      if (val === 1) {
        hashMap.delete(nums[i]);
      } else {
        hashMap.set(nums[i], val - 1);
      }
    } else {
      const val = hashMap.get(k - nums[i]);
      if (val) {
        hashMap.set(k - nums[i], val + 1);
      } else {
        hashMap.set(k - nums[i], 1);
      }
    }
  }

  return operations;
}

// [4, 5, 5, 6, 9, 10]    13
function maxOperations2(nums: number[], k: number): number {
  let operations = 0;
  const sorted = nums.sort((a, b) => a - b);
  let firstPointer = 0;
  let secondPointer = nums.length - 1;

  while (firstPointer < secondPointer) {
    const first = sorted[firstPointer];
    const second = sorted[secondPointer];

    if (sorted[firstPointer] + sorted[secondPointer] === k) {
      operations++;
      firstPointer++;
      secondPointer++;
    } else {
      if (first + second > k) {
        secondPointer--;
      } else {
        firstPointer++;
      }
    }
  }

  return operations;
}
