//https://leetcode.com/problems/binary-tree-inorder-traversal/

//Left-Root-Right Traversal https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/

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

function inorderTraversal(root: TreeNode | null): number[] {
  const generator = _inorderTraversalStack(root);
  const arr = [];
  let done = false;

  while (done === false) {
    const gen = generator.next();
    if (!gen.done) {
      arr.push(gen.value);
    } else {
      done = gen.done;
    }
  }
  return arr;
}

function* _inorderTraversalStack(head: TreeNode | null) {
  if (head !== null) {
    const stack = new Stack<TreeNode>();
    let current = head;

    stack.push(current);
    let traversalLeft = true;

    while (!stack.isEmpty()) {
      if (traversalLeft) {
        while (current.left !== null) {
          stack.push(current);
          current = current.left;
        }
      }

      yield current.val;

      if (current.right !== null) {
        current = current.right;
        traversalLeft = true;
      } else {
        current = stack.pop()!;
        traversalLeft = false;
      }
    }
  }
}

class Stack<T> {
  public items: Array<T> = [];

  push(el: T) {
    this.items.push(el);
  }

  pop() {
    const element = this.items.pop();
    return element;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
