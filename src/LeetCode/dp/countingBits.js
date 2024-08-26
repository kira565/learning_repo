"use strict";
//Given an integer n, return an array ans of
//length n + 1 such that for each i (0 <= i <= n), ans[i] is the number
//of 1's in the binary representation of i.
Object.defineProperty(exports, "__esModule", { value: true });
function countBits(n) {
    const nums = [];
    function dec2bin(dec) {
        let delimeter = dec;
        let count = 0;
        while (delimeter >= 1) {
            if (delimeter % 2 >= 1) {
                count++;
            }
            delimeter = delimeter / 2;
        }
        return count;
    }
    for (let i = 0; i <= n; i++) {
        const count = dec2bin(i);
        nums.push(count);
    }
    return nums;
}
