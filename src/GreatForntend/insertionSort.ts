export default function insertionSort(arr: Array<number>): Array<number> {
  // Iterate through the array, starting with the 2nd element.
  for (let i = 1; i < arr.length; i++) {
    // Store the current value in a variable so it
    // can be shifted to the correct position after the comparisons
    let currentVal = arr[i];
    // Initialize a pointer for the index of the previous element
    // so we can use it to iterate progressively backwards
    // through preceding elements.
    let j = i - 1;
    // Keep iterating backwards through preceding elements
    // as long as the previous element is greater than the current value.
    while (j >= 0 && arr[j] > currentVal) {
      // [because here is >= 0 j can go up to -1 if we need to place it to the first elem]
      // "Move" the previous element one position to the right.
      // if it's bigger than currentValue.
      arr[j + 1] = arr[j]; // shift right

      // Decrement the pointer so as to keep comparing with the
      // previous element.
      j--;
    }
    // Set the currentValue into its final position.
    arr[j + 1] = currentVal;
  }
  return arr;
}
//[(5, 2, 1, 4, 0, 6, 3)];
