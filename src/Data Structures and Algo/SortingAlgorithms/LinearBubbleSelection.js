"use strict";
//https://ru.hexlet.io/courses/basic-algorithms/lessons/sorting/theory_unit
Object.defineProperty(exports, "__esModule", { value: true });
//Sorting algorithms
// There are many sorting algorithms
// But there are 3 fundamental ones
//1. Bubble sort
//2. Selection sort
//3. Quick sort
// Whe should remember about marginal cases when there are 0 or 1 elements
// and we should care about these cases
//1 Bubble sort
// Один из самых простых методов — пузырьковая сортировка. Это название произошло от ассоциации с воздухом в воде: на дне пузырьки совсем маленькие, но постепенно поднимаются к поверхности, собирают кислород и увеличиваются.
// Похожий принцип работает и с элементами массива при такой сортировке. Посмотрите на этот рисунок:
const array = [4, 7, 5, 10, 1, 6, 9, 3, 8, 2, -1];
let myIterations = 0;
let hexletIterations = 0;
function bubbleSort(array) {
    if (array.length < 2) {
        return array;
    }
    let length = array.length - 1;
    while (length > 0) {
        for (let i = 0; i < length; i++) {
            const keeped = array[i];
            if (array[i] > array[i + 1]) {
                array[i] = array[i + 1];
                array[i + 1] = keeped;
            }
            myIterations++;
        }
        length--;
    }
    return array;
}
const bubbleSortHexLet = (items) => {
    for (let limit = items.length - 1; limit > 0; limit -= 1) {
        for (let i = 0; i < limit; i += 1) {
            hexletIterations++;
            if (items[i] > items[i + 1]) {
                const temporary = items[i];
                items[i] = items[i + 1];
                items[i + 1] = temporary;
            }
        }
    }
    return array;
};
//console.log(bubbleSort(array), myIterations);
//При пузырьковой сортировке соседние элементы часто
//меняются местами, поэтому она работает довольно медленно.
//Чтобы сэкономить время, можно сократить количество перестановок.
// В этом поможет сортировка выбором.
// First we search minimal element in array, then put it
// to zero index, then we start from 2nd element and scan again
myIterations = 0;
function selectionSort(items) {
    if (array.length < 2) {
        return array;
    }
    let start = 0;
    while (start < array.length - 1) {
        let minIdx = start;
        for (let i = start + 1; i < array.length; i++) {
            myIterations++;
            if (array[i] < array[minIdx]) {
                minIdx = i;
            }
        }
        if (minIdx !== start) {
            const keeped = array[start];
            array[start] = array[minIdx];
            array[minIdx] = keeped;
        }
        start++;
    }
    return array;
}
//console.log(selectionSort(array), myIterations);
//вторая реализация считай совпала с хекслетом в первой тож но была ошибка while <= 2
// Quick Sort,
// Выделяем опорный елемент и делим массив на два относительно него все
// меньщие элементы влево все большие вправо
// эти два масива опять рекурсивно отправляем в функцию и склеиваем по середине с опорным
// элементом так как мы проверяли до и после него
// постепенно по ходу разделения массивов на 2 части их длина сократится до 0
function quickSort(array) {
    if (array.length < 2) {
        return array;
    }
    let supporting = array[0];
    const left = [];
    const right = [];
    // нужно запомнить что не с нуля ведь один элемент мы взяли опорный
    //мы не можем его закидывть никуда
    // иначе будет ендлес луп
    for (let i = 1; i < array.length; i++) {
        myIterations++;
        if (array[i] < supporting) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat(supporting, quickSort(right));
}
console.log(quickSort(array), myIterations); // в два раза меньше кста
// по памяти надо будет оптимизировать позже
// Insertion sort
// In the case of insertion sort, the best case time complexity is O(n), the worst case time complexity
// is O(n2), and the average case time complexity is also O(n2).
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        let j = i - 1; // prev point;
        while (j >= 0 && arr[j] > currentVal) {
            arr[j + 1] = arr[j]; // shift right
            j--;
        }
        arr[j + 1] = currentVal;
    }
    return arr;
}
exports.default = insertionSort;
