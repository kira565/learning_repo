"use strict";
//Find all combinations of climbing to the top
Object.defineProperty(exports, "__esModule", { value: true });
// n - steps to the top
//1 <= n <= 45
// n = 2; Output = 2: 1+1 and 2
// n = 3; Output = 3 : 1+1+1 1+2 2+1
function climbStairs(n) {
    let prev = 1, next = 1;
    for (let i = n - 1; i >= 0; i--) {
        const temp = prev;
        prev = prev + next;
        next = temp;
    }
    return prev;
}
// Это решение от братного мы берем две последние ступени и идем вниз BOTTOM UP DP
// получается если это n = 5 мыстартуем с позиции 0
// короче получается тот же самый фибоначи
// с конца лесницы
// [ x0, x1, x2, x3, x4, x5]
//  1 - x5 , 1 - x4, 2 - x3, 3 - x2, 5 - x1, 8 - x0
//
// [0,1,2,3] - [1,1,2,3]
