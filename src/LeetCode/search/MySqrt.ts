// Givan non negative integer
// return the square root of intger rounded down to the nearest

//2 - 1.4
//4 - 2*2
//8 - 4 - 2.8 * 2.8
//12 - 6 - 3 - 4
// 32 - 5.6
//0 <= x <= 2ˆ31 - 1
// 32 / 2 = 16 - 8 - 4

// 0 4 5 <- 6 8 16 32 !! answer 5

//8 -
// 1-8
// 8 / 2 = 4 mnogo (16)
// 1 - 4
// 4 / 2 = 2 (malo 4)
// 2 - 4

export function mySqrt(x: number): number {
  let start = 1;
  let end = x;

  while (start <= end) {
    const middle = (start + end / start) / 2;
    const res = middle * middle;
    if (x === Math.round(res)) {
      return Math.floor(middle);
    } else {
      start = middle;
    }
  }

  return -1;
}
