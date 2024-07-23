"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeNode {
    val;
    left;
    right;
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
function invertTree(root) {
    if (!root) {
        return null;
    }
    let currentNode = root;
    if (currentNode.left !== null || currentNode.right !== null) {
        const node = currentNode.left;
        currentNode.left = currentNode.right;
        currentNode.right = node;
        invertTree(currentNode.left);
        invertTree(currentNode.right);
    }
    return root;
}
