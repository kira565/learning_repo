"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxDepth = void 0;
const StackAndQueue_1 = require("../../Data Structures and Algo/StackAndQueue");
class _Node {
    val;
    children;
    constructor(val, children) {
        this.val = val === undefined ? 0 : val;
        this.children = children === undefined ? [] : children;
    }
}
function maxDepth(root) {
    let biggest = 0;
    if (root === null) {
        return biggest;
    }
    const queue = new StackAndQueue_1.QueueByList();
    queue.push({ node: root, level: 1 });
    while (!queue.isEmpty()) {
        const current = queue.pop();
        if (current.level > biggest) {
            biggest = current.level;
        }
        if (current.node.children.length > 0) {
            current.node.children.forEach((child) => child.children.length > 0 &&
                queue.push({ node: child, level: current.level + 1 }));
            if (queue.isEmpty()) {
                biggest++;
            }
        }
    }
    return biggest;
}
exports.maxDepth = maxDepth;
