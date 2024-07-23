import { Stack } from "../../Data Structures and Algo/StackAndQueue";

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

export function preorderTraversal(root: TreeNode | null): number[] {
  const preorderTraversalArray: number[] = [];
  if (!root) {
    return [];
  }
  const stack = new Stack<TreeNode>();
  let current = root;
  stack.push(root);
  preorderTraversalArray.push(root.val);

  let isMovingLeft = true;

  while (!stack.isEmpty()) {
    if (isMovingLeft) {
      while (current.left !== null) {
        stack.push(current); // нужно подчеркнуть чтобы вернуться успешно в корень и пойти направо мы добавили тут в стек два раза корневой узел
        current = current.left;
        preorderTraversalArray.push(current.val);
      }
    }

    if (current.right !== null) {
      current = current.right;
      preorderTraversalArray.push(current.val);
      isMovingLeft = true;
    } else {
      current = stack.pop()!;
      isMovingLeft = false;
    }
  }
  return preorderTraversalArray;
}

export const rootTest = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6))
);
