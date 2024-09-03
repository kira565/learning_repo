//* Given an int array.

// ? Return all triplets [nums[i], nums[j], nums[k]]
//? i !== j, i !== k, j !== k (indexes are all different)
// ? no duplicate triples

//* constraints:
//  3 < nums.length <= 3000
// -10^5 <= nums[i] <= 10^5

// [-10,-4,-5,-2,-1,1,2,3,4,9]
// [-4,-1,-1,0,0,1,1,2] //[-1,1,0], [-1,0,1]
function threeSum(nums: number[]): number[][] {
  const triplets: number[][] = [];
  const sorted = nums.sort((a, b) => a - b);
  const map = new Map<number, number>();
  let start = 0;
  let end = sorted.length - 1;

  while (start < end) {
    const left = sorted[start];
    const right = sorted[end];
    const twoSumm = left + right;
    const search = 0 - twoSumm;

    const mapVal = map.get(search);
    //out of range
    if (mapVal !== undefined) {
      for (let i = 0; i < mapVal; i++) {
        triplets.push([left, right, search]);
      }
    }
    //inRange
    const val = binarySearch(sorted, search, left, right);
    if (val) {
      triplets.push([left, right, val]);
    }

    //memoize
    let mapLeft = map.get(left);
    let mapRight = map.get(right);
    if (mapLeft !== undefined) {
      map.set(left, mapLeft++);
    } else {
      map.set(left, 1);
    }
    if (mapRight !== undefined) {
      map.set(right, mapRight++);
    } else {
      map.set(right, 1);
    }
    start++;
    end--;
  }

  return triplets;
}

function binarySearch(
  arr: number[],
  search: number,
  left: number,
  right: number
) {
  let start = left;
  let end = right;

  while (start <= end) {
    const middle = Math.floor(start + end) / 2;

    if (arr[middle] === search) {
      return search;
    }

    if (arr[middle] > search) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return null;
}
