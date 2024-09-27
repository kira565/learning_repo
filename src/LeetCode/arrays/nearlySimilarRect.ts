//* Given arr rectangle [[a,b], [c,d]...]
// two rects are similar if a / c === b / d
// find count of similar rectangles

// [[5,10], [10,10], [3,6], [9, 91]]
// [5,10], [3,6] sim 5/3 === 10/6
//
// n <= 10^5

function countNearlySimilarRectangle(rects: number[][]) {
  const map = new Map<number, number>();
  let count = 0;

  for (let [a, b] of rects) {
    const ratio = a / b;
    const existing = map.get(ratio);
    if (existing !== undefined) {
      map.set(ratio, existing + 1);
    } else {
      map.set(ratio, 0);
    }
  }
  // 3.19 : 4 --> 1,2, 1,3 1,4, 2,3, 2,4, 3,4

  return Array.from(map.values()).reduce((acc, val));
}
