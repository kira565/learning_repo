//* Given
// array of intefer heights of length n
// there are n vertical lines drawn such that the two endpoints (i, 0), (i, height[i])

//? find two lines that represntrs container with the most water
//? return maximum amount of water a container can store

//eg [1,8(1),6,2,5,4,8,3,7(8)] // 8 and 7 are the biggest and farest from each other heights, they can store (max h = 7) * (delimteters x axis = 7) = 49

//надо сравнивать удельную вместимость то есть  indexEnd - indexStart чем больше тем лучше (indexEnd-indexStart)*maxH= вмесьимлсьб
function maxArea(height: number[]): number {
  let biggestValue = 0;
  let start = 0;
  let end = height.length - 1;

  while (start < end) {
    const hs = height[start];
    const he = height[end];

    const capacity = Math.min(height[start], height[end]) * (end - start);
    if (capacity > biggestValue) {
      biggestValue = capacity;
    }

    if (hs > he) {
      end--;
    } else if (he > hs) {
      start++;
    } else {
      end--;
      start++;
    }
  }

  return biggestValue;
}
