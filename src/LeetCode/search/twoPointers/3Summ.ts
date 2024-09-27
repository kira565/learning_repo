//* Given integer array
//? Find: all triplets [nums[i], nums[j], nums[k]] such that i !== j i !== k j !== k
//? where nums[i] + nums[j] + nums[k] === 0
//!Notice that the solution set must not contain duplicate triplets.

//[-1,0,1,2,-1,-4]
//[[-1,-1,2],[-1,0,1]]

//  -4 -1 -1 0 1 2

// -10 -8 -7 -5 -4 -3 -2 0 3 4 6 7 8 9 13
//! My solution was shit, looked up for solution and rewrited ;(
function threeSum(nums: number[]): number[][] {
  const triplets: number[][] = [];
  const sorted = nums.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length - 2; i++) {
    if (nums[i] === nums?.[i - 1]) continue; // skip duple

    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      // [-5, -4 ---> ... <---10], [-5, -4, -2 ----> ... <---- 10], ...
      const summ = nums[i] + nums[j] + nums[k]; // check summ

      if (summ === 0) {
        // summ === 0 match!
        triplets.push([nums[i], nums[j], nums[k]]);

        while (nums[j] === nums?.[j + 1]) j++; //we skip duplicates because we dont need them
        while (nums[k] === nums?.[k - 1]) k--;
        // if summ match, we can move both pointers because there is
        //no point to move one by one (если мы только один подвинем там то же число нужно будет найти что и было а это дупль)
        j++;
        k--;
      } else if (summ < 0) {
        // если сумма трех чисел меньше нуля надо увеличивать левый указатель
        j++;
      } else {
        k--; // и наоборот
      }
    }
  }
  return triplets;
}
