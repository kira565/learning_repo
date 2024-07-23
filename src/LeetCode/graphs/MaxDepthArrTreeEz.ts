import { QueueByList } from "../../Data Structures and Algo/StackAndQueue";

class _Node {
  val: number;
  children: _Node[];

  constructor(val?: number, children?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

export function maxDepth(root: _Node | null): number {
  let biggest = 0;
  if (root === null) {
    return biggest;
  }

  const queue = new QueueByList<{ node: _Node; level: number }>();
  queue.push({ node: root, level: 1 });

  while (!queue.isEmpty()) {
    const current = queue.pop()!;
    if (current.level > biggest) {
      biggest = current.level;
    }
    if (current.node.children.length > 0) {
      current.node.children.forEach(
        (child) =>
          child.children.length > 0 &&
          queue.push({ node: child, level: current.level + 1 })
      );
      if (queue.isEmpty()) {
        biggest++;
      }
    }
  }

  return biggest;
}
