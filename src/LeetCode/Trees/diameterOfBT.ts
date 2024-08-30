import { Stack } from "../../DataStructuresAndAlgo/StackAndQueue";
import { TreeNode } from "./tree-node";

//* Given:
// Root of BT
// Return length of the diameter of BT.

//the diameter of bt is a length of the longest path between any two noedes in a tree
// This path may or may not  pass through the root

//? the length of path between two nodes is represented by te number of edges between them

//DFS

function diameterOfBinaryTree(root: TreeNode | null): number {
  let longest = 0;

  function dfs(node: TreeNode | null): number {
    if (node === null) {
      return 0;
    } else {
      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);
      longest = Math.max(longest, leftDepth + rightDepth);
      const returnable = Math.max(leftDepth, rightDepth);
      return returnable + 1;
    }
  }

  dfs(root);
  return longest;
}

const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

const dia = diameterOfBinaryTree(root);

// рекурсивный дфс left-right : 1,2,4,5,3

//                 1
//                / \
//               2   3
//              / \
//             4   5

// Спустились вниз до самой левой ноды, получили 0,0 тк нет потомков - глубина d = (Max[0,0]), идем вверх d + 1 (1)
// Пошли вправо по дфс снова нет потомков, получили 0,0 тк нет потомков - глубина d = (Max[0, 0]), идем вверх d + 1 (1)
// вернулись по рекурсии на ноду выше (2) - одинаковая глубина чайлд деревьев d = (Max[1,1]), идем вверх + 1 (2)

// идем в последнюю правую ноду получили 0, 0 тк нет потомков - глубина d = Max[0,0] , идемм вверх d + 1 (1)
// поднимаемся в корневую ноду получаем глубину [2, 1] левого и правого дерева соответственно, Max[2,1] + 1 = 3
