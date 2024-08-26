"use strict";
//https://leetcode.com/problems/binary-tree-postorder-traversal/
Object.defineProperty(exports, "__esModule", { value: true });
const StackAndQueue_1 = require("../../../Data Structures and Algo/StackAndQueue");
//Left-Right-Root
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
function postorderTraversal(root) {
    const postOrderArray = [];
    if (root === null) {
        return [];
    }
    const stack = new StackAndQueue_1.Stack();
    stack.push(root);
    while (!stack.isEmpty()) {
        let current = stack.pop();
        if (!current.left && !current.right) {
            postOrderArray.push(current.val);
        }
        else {
            stack.push(current);
            current.right && stack.push(current.right);
            current.left && stack.push(current.left); // left > right > root (added last to stak is cloer)
            //make it null because we already added traversing for left and right so after traversal
            //left and right we can push root node in above condition (mark subtree as traversed)
            current.left = null;
            current.right = null;
        }
    }
    // TODO try to simplify other stack solutions
    return postOrderArray;
}
