"use strict";
//https://wcademy.ru/sliding-window-method/
// Сегодня поговорим о методе скользящего окна и посмотрим
//  его применение на конкретной задаче. Он должен сразу всплыть
//  в голове, если в задачке просят найти самую длинную/короткую
//  строку, подмассив или какое-то значение на их основе.
Object.defineProperty(exports, "__esModule", { value: true });
//Задача
// Для массива, состоящего из n целых чисел, найдите
// непрерывный подмассив заданной длины k, который имеет
// максимальное среднее значение. Нужно вывести максимальное
// среднее значение.
// БРУТФОРС 12.75
function findMaxAverageBruteforce(array, k) {
    let average = 0;
    for (let i = 0; i < array.length - k + 1; i++) {
        let summ = 0;
        for (let j = i; j < i + k; j++) {
            summ += array[j];
        }
        const averageCurrent = summ / k;
        average = Math.max(averageCurrent, average);
    }
    return average;
}
// Сложность этого решения O(n*k), где n - длина переданного массива.
//  Но это наивное решение редко удовлетворит собеседующего, литкод
//   тоже на это намекает, он пожалуется, что превышен лимит по
//   времени. Так что давайте подумаем, как найти решение получше.
// Если внимательно взглянуть на текущее решение, то легко заметить,
// что при каждом сдвиге мы заново высчитываем сумму элементов.
// Можно ли как-нибудь переиспользовать сумму для пересекающихся подмассивов?
// Чтобы переиспользовать рассчитанную для предыдущего подмассива сумму, достаточно
// вычесть элемент выпадающий из окна и добавить новый, попавший в окно.
function findMaxAverageSmart(array, k) {
    let average = 0;
    let summ = 0;
    let windowStartIdx = 0;
    for (let i = 0; i < array.length; i++) {
        if (i <= k - 1) {
            summ += array[i];
            if (i === k - 1) {
                average = Math.max(summ / k, average);
            }
        }
        else {
            summ -= array[windowStartIdx];
            summ += array[i];
            average = Math.max(summ / k, average);
            windowStartIdx++;
        }
    }
    return average;
}
const array2 = [1, 12, -5, -6, 50, 3];
const k = 4;
//console.log(findMaxAverageBruteforce(array, k));
console.log(findMaxAverageSmart(array2, k));
// верхняя реализация моя но можно просто написать тупее и читабельнее
function findMaxAverage(nums, k) {
    // считаем сумму первого окна
    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum += nums[i];
    }
    let res = sum; // храним максимальную сумму
    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k]; // добавляем вошедший/убираем ушедший
        res = Math.max(res, sum);
    }
    return res / k;
}
