import { TreeNode, isSameTree } from "./LeetCode/graphs/SameTree-easy";
import { maximumLengthSubstring } from "./LeetCode/search/slidingWindow/2occMaxStrEz";

const nodeA = new TreeNode(1, new TreeNode(2), new TreeNode(3));

const nodeB = new TreeNode(1, new TreeNode(2), new TreeNode(3));

console.log(maximumLengthSubstring("ccbcb"));
