"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndx]) {
                minIndx = j;
            }
        }
        [arr[i], arr[minIndx]] = [arr[minIndx], arr[i]];
    }
    return arr;
}
exports.default = selectionSort;
