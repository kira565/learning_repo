"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bstToGst = void 0;
const StackAndQueue_1 = require("../../Data Structures and Algo/StackAndQueue");
function bstToGst(root) {
    const generatorBst = inOrderTraversal(root);
    let treeSumm = 0;
    let result = generatorBst.next();
    while (result.done !== true) {
        console.log(result.value);
        treeSumm += result.value.val;
        result = generatorBst.next();
    }
    console.log(treeSumm);
    const generatorSum = inOrderTraversal(root);
    let nodeGen = generatorSum.next();
    let prev = 0;
    while (!nodeGen.done) {
        treeSumm -= prev;
        prev = nodeGen.value.val;
        nodeGen.value.val = treeSumm;
        nodeGen = generatorSum.next();
    }
    return root;
}
exports.bstToGst = bstToGst;
function* inOrderTraversal(root) {
    if (root !== null) {
        let movingLeft = true;
        let current = root;
        const stack = new StackAndQueue_1.Stack();
        stack.push(current);
        while (!stack.isEmpty()) {
            if (movingLeft) {
                while (current.left !== null) {
                    stack.push(current);
                    current = current.left;
                }
            }
            yield current;
            if (current.right !== null) {
                current = current.right;
                movingLeft = true;
            }
            else {
                const backNode = stack.pop();
                current = backNode;
                movingLeft = false;
            }
        }
    }
}
