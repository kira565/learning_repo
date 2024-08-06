import {
  QueueByList,
  Stack,
} from "../../Data Structures and Algo/StackAndQueue";
import { TreeNode } from "../Trees/tree-node";

export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  const queueP = new QueueByList<TreeNode | null>();
  const queueQ = new QueueByList<TreeNode | null>();

  queueP.push(p);
  queueQ.push(q);

  while (!queueP.isEmpty() || queueQ.isEmpty()) {
    const levelSize = queueP.size;
    for (let i = 0; i < levelSize; i++) {
      const pNode = queueP.pop();
      const qNode = queueQ.pop();
      console.log(pNode, qNode);
      if (pNode?.val !== qNode?.val) {
        return false;
      } else {
        if (pNode?.left) {
          queueP.push(pNode.left);
        }
        if (pNode?.right) {
          queueP.push(pNode.right);
        }
        if (qNode?.left) {
          queueQ.push(qNode.left);
        }
        if (qNode?.right) {
          queueQ.push(qNode.right);
        }
      }
    }
  }

  return true;
}
