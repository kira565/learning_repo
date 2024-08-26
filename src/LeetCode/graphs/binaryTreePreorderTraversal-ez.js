"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootTest = exports.preorderTraversal = void 0;
const StackAndQueue_1 = require("../../Data Structures and Algo/StackAndQueue");
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
function preorderTraversal(root) {
    const preorderTraversalArray = [];
    if (!root) {
        return [];
    }
    const stack = new StackAndQueue_1.Stack();
    let current = root;
    stack.push(root);
    preorderTraversalArray.push(root.val);
    let isMovingLeft = true;
    while (!stack.isEmpty()) {
        if (isMovingLeft) {
            while (current.left !== null) {
                stack.push(current); // нужно подчеркнуть чтобы вернуться успешно в корень и пойти направо мы добавили тут в стек два раза корневой узел
                current = current.left;
                preorderTraversalArray.push(current.val);
            }
        }
        if (current.right !== null) {
            current = current.right;
            preorderTraversalArray.push(current.val);
            isMovingLeft = true;
        }
        else {
            current = stack.pop();
            isMovingLeft = false;
        }
    }
    return preorderTraversalArray;
}
exports.preorderTraversal = preorderTraversal;
exports.rootTest = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, null, new TreeNode(6)));
