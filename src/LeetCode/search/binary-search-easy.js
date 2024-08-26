"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nums = [-1, 0, 3, 5, 9, 12];
const targetS = 9;
//0 , 5
//4 5
function search(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        const middle = Math.floor(end - start / 2);
        if (nums[middle] === target) {
            return middle;
        }
        else {
            if (nums[middle] < target) {
                start = middle + 1;
            }
            else if (nums[middle] > target) {
                end = middle - 1;
            }
        }
    }
    return -1;
}
