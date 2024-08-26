"use strict";
// Given 2 strings haystack and needle
Object.defineProperty(exports, "__esModule", { value: true });
exports.strStr = void 0;
// return first index occurence of needle in haystack
// return -1 if needle is not part
//constraits
// 1 <= haystack.length, needle.length <= 104
//haystack and needle consist of only lowercase English characters.
//haystack =
//"mississippi"
//needle =
//"issip"
function strStr(haystack, needle) {
    let index = -1;
    let nextI = -1;
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle[0]) {
            index = i;
            nextI = -1;
            let aPointer = i;
            let bPointer = i + needle.length - 1;
            let xPointer = 0;
            let yPointer = needle.length - 1;
            while (aPointer <= bPointer && xPointer <= yPointer) {
                if (haystack[aPointer] === needle[0] && nextI < 0) {
                    nextI = aPointer;
                }
                if (haystack[aPointer] === needle[xPointer] &&
                    haystack[bPointer] === needle[yPointer]) {
                    aPointer++;
                    bPointer--;
                    xPointer++;
                    yPointer--;
                }
                else {
                    index = -1;
                    if (nextI > 0) {
                        i = nextI;
                    }
                    break;
                }
            }
            if (index >= 0) {
                return index;
            }
        }
    }
    return index;
}
exports.strStr = strStr;
