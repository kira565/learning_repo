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

// Xuevoe nemnogo reshenie
// function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
//     let summ = 0;
//     if(root.val <= high && root.val >= low) {
//         summ += root.val
//     }

//     if(root.left) {
//         summ += rangeSumBST(root.left, low, high)
//     }
//     if(root.right) {
//         summ += rangeSumBST(root.right, low, high)
//     }
//     return summ;
// };
// podsmotrel na leetcode
function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (root === null) return 0;

  if (root.val > high) {
    return rangeSumBST(root.left, low, high);
  } else if (root.val < low) {
    return rangeSumBST(root.right, low, high);
  }

  return (
    root.val +
    rangeSumBST(root.left, low, high) +
    rangeSumBST(root.right, low, high)
  );
}
