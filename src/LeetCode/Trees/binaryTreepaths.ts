//https://leetcode.com/problems/binary-tree-paths/description/

function binaryTreePaths(root: TreeNode | null): string[] {
  if (root === null) return [];

  const visitedRoutes: string[] = [];

  function isLeaf(node: TreeNode) {
    return node.left === null && node.right === null;
  }

  function constructNewPath(prevPath: string, newNode: number) {
    return (prevPath += "->" + newNode);
  }

  const stack = new Stack<{ treeNode: TreeNode; path: string }>();

  stack.add({ treeNode: root, path: String(root.val) });

  while (!stack.isEmpty()) {
    const { treeNode, path } = stack.takeTop()!;

    if (isLeaf(treeNode)) {
      visitedRoutes.push(path);
    } else {
      if (treeNode.left) {
        stack.add({
          treeNode: treeNode.left,
          path: constructNewPath(path, treeNode.left.val),
        });
      }

      if (treeNode.right) {
        stack.add({
          treeNode: treeNode.right,
          path: constructNewPath(path, treeNode.right.val),
        });
      }
    }
  }

  return visitedRoutes;
}
class Stack<T> {
  items: T[] = [];

  add(value: T) {
    this.items.push(value);
  }

  takeTop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length < 1;
  }
}
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
