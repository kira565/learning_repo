//Dynamic programming
//https://habr.com/ru/articles/777618/
let iterationsNotCached = 0;
let iterationsCached = 0;

// classic example fibonachi найти n-oe число в последовательности фибоначи
function fibonachi(n: number): number {
  iterationsNotCached++;
  if (n === 1 || n === 0) {
    return 1;
  } else {
    const f1 = fibonachi(n - 1);
    const f2 = fibonachi(n - 2);
    const summ = f1 + f2;
    return f1 + f2;
  }
} // решение оч медленное //
// некоторые числа в последовательности рассчитываются по многу раз
// и в зависитмости от позиции числа количество одинаковых расчетов растет по экспоненте
// самая очевидная фигня которая помогает и используется в динамическом программировании
// это кеширование
// сверху вниз

function cachedFibonachi(n: number, cache: Map<number, number>): number {
  iterationsCached++;
  if (n === 1 || n === 0) {
    return 1;
  } else {
    if (cache.has(n)) {
      return cache.get(n)!;
    } else {
      const summ =
        cachedFibonachi(n - 1, cache) + cachedFibonachi(n - 2, cache);
      cache.set(n, summ);
      return summ;
    }
  }
}

// Третий вариант снизу вверх пиздец ну и ебаловка
function fibonachiGraph(n: number) {
  let a = 1;
  let b = 1;
  for (let i = 2; i < n + 1; i++) {
    const atemp = b;
    b = a + b;
    a = atemp;
  }
  return b;
}
