//? https://www.hackerrank.com/challenges/picking-numbers/problem?isFullScreen=true
// Given an array of integers, find the longest subarray where the absolute difference
// between any two elements is less than or equal to 1.

function pickingNumbers(a: number[]): number {
  // Write your code here
  if (a.length < 1) return 0;

  let biggestLength = 0;
  let currentLength = 1;
  const sorted = a.sort((a, b) => a - b);
  let start = 0;

  for (let i = 1; i < sorted.length; i++) {
    const isDifferenceOk = sorted[i] - sorted[start] <= 1;
    if (isDifferenceOk) {
      currentLength++;
    }
    if (currentLength > biggestLength) {
      biggestLength = currentLength;
    }
    if (!isDifferenceOk) {
      start = i;
      currentLength = 1;
    }
  }
  return biggestLength;
}
