"use strict";
// https://ru.hexlet.io/courses/basic-algorithms/lessons/binary-search/theory_unit
Object.defineProperty(exports, "__esModule", { value: true });
// Lets look on a simple situation like google search
// lets assume that we need to google "А роза упала на лапу азора"
// words Роза упала лапу Азора are important for search engine
// because they are rare
// and words like А на are very often and they need to be cutted
// from search algorithms
// lets assume we have table of such words,
// first they are in random order
// because they are in random order, its very long to search
// but
// let sort it in alphabet order
// so this is Linear search
const stopWords = [
    "ее",
    "на",
    "по",
    "со",
    "же",
    "браво",
    "всего",
    "я",
    "итого",
];
const isStopWord = (candidate) => {
    for (let i = 0; i < stopWords.length; i += 1) {
        if (stopWords[i] === candidate) {
            return true;
        }
    }
    return false;
};
// in the badest scenario function will check all words
// Then look at situation when we have ordered array,
// we can use binary search here
//Short description of mechanics:
//1. Search starts from middle element
//2. On each step the zone narrows by half
//3. It ends when zone equals 1 element
// Example
const stopWords2 = [
    "а",
    "без",
    "ближе",
    "браво",
    "бы",
    "вам", //5
    "вас",
    "весь",
    "во",
    "все",
    "всего",
    "вы",
];
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function binarySearch(array, searchWord) {
    let start = 0;
    let end = array.length - 1;
    // while search zone is not empty Keep searching until the left and right indices meet.
    // not > because imagine [1,2] we cannot find there if condition will be ">"
    while (end >= start) {
        //запомни сука наконецто чтоб найти средину надо старт сложить сложить
        // с концом и поделить на два
        const middle = Math.floor((start + end) / 2);
        // start + end cuz indexing are keeping
        // eg when start 5 and end 10 middle index will be 7
        if (searchWord === array[middle]) {
            return true;
        }
        if (searchWord < array[middle]) {
            end = middle - 1;
            //start middle+-1 because middle is next and its checked aboveß
        }
        else {
            start = middle + 1;
            //start middle+1 because middle is previous and its checked above
        }
    }
    return start; // куда вставить если не найден элемент
    // догадался методом тыка, плохо, енд уходит всегда за старт на -1
    // а старт всегда указывает на индекс недостающего
}
const arr = [-1, 1, 2, 4, 5, 6, 7];
const target = 3;
console.log(binarySearch(arr, 9));
