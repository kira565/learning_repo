//https://leetcode.com/problems/binary-tree-postorder-traversal/

import { Stack } from "../../../Data Structures and Algo/StackAndQueue";

//Left-Right-Root

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function postorderTraversal(root: TreeNode | null): number[] {
  const postOrderArray: number[] = [];
  if (root === null) {
    return [];
  }
  const stack = new Stack<TreeNode>();
  stack.push(root);

  while (!stack.isEmpty()) {
    let current = stack.pop()!;
    if (!current.left && !current.right) {
      postOrderArray.push(current.val);
    } else {
      stack.push(current);
      current.right && stack.push(current.right);
      current.left && stack.push(current.left); // left > right > root (added last to stak is cloer)
      //make it null because we already added traversing for left and right so after traversal
      //left and right we can push root node in above condition (mark subtree as traversed)
      current.left = null;
      current.right = null;
    }
  }
  // TODO try to simplify other stack solutions
  return postOrderArray;
}
