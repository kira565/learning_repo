import { current } from "@reduxjs/toolkit";
import { TreeNode } from "./tree-node";

//Given:
// int array sorted

// [-10,-3,0,5,9]

// convert it to height-balanced BST

//1 <= nums.length <= 104
//-104 <= nums[i] <= 104
//nums is sorted in a strictly increasing order.

// simple recursive solution,
// like binary search ,
//every step take central index and create rootNode,
// left - recursion(0 - middle) right - recursion(middle - end)
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  let middle = Math.floor(nums.length / 2);
  const node = new TreeNode(
    nums[middle],
    sortedArrayToBST(nums.slice(0, middle)),
    sortedArrayToBST(nums.slice(middle + 1, nums.length))
  );

  return node;
}
