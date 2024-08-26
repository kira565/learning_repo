"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameTree = exports.TreeNode = void 0;
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
exports.TreeNode = TreeNode;
function isSameTree(p, q) {
    const queueP = new StackAndQueue_1.QueueByList();
    const queueQ = new StackAndQueue_1.QueueByList();
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
            }
            else {
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
exports.isSameTree = isSameTree;
