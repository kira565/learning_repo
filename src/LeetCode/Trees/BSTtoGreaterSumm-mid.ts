import { Stack } from "../../Data Structures and Algo/StackAndQueue";
import { BinaryTreeNode } from "../../Data Structures and Algo/Trees/BinaryTree";

export function bstToGst(
  root: BinaryTreeNode<number> | null
): BinaryTreeNode<number> | null {
  const generatorBst = inOrderTraversal(root);
  let treeSumm = 0;
  let result = generatorBst.next();
  while (result.done !== true) {
    console.log(result.value);
    treeSumm += result.value.val;
    result = generatorBst.next();
  }
  console.log(treeSumm);

  const generatorSum = inOrderTraversal(root);
  let nodeGen = generatorSum.next();
  let prev = 0;

  while (!nodeGen.done) {
    treeSumm -= prev;
    prev = nodeGen.value.val;
    nodeGen.value.val = treeSumm;
    nodeGen = generatorSum.next();
  }

  return root;
}

function* inOrderTraversal(
  root: BinaryTreeNode<number> | null
): Generator<BinaryTreeNode<number>> {
  if (root !== null) {
    let movingLeft = true;
    let current = root;
    const stack = new Stack<BinaryTreeNode<number>>();
    stack.push(current);

    while (!stack.isEmpty()) {
      if (movingLeft) {
        while (current.left !== null) {
          stack.push(current);
          current = current.left;
        }
      }
      yield current;

      if (current.right !== null) {
        current = current.right;
        movingLeft = true;
      } else {
        const backNode = stack.pop();
        current = backNode!;
        movingLeft = false;
      }
    }
  }
}
