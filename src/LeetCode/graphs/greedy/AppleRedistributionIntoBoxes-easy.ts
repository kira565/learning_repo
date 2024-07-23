//https://leetcode.com/problems/apple-redistribution-into-boxes/description/
//console.log(minimumBoxes([1, 3, 2], [5, 4, 3, 2, 1]), "BOXES");
export function minimumBoxes(apple: number[], capacity: number[]): number {
  let minBoxes = 0;
  const greedyCapacity = capacity.sort((a, b) => b - a);
  let cIdx = -1;
  let pack = 0;

  for (let i = 0; i < apple.length; i++) {
    if (pack < 1) {
      cIdx++;
      pack = greedyCapacity[cIdx];
      minBoxes++;
    }
    let apples = apple[i];
    pack -= apples;
    if (pack < 0) {
      apple.push(Math.abs(pack));
      pack = 0;
    }
  }

  return minBoxes;
}
