"use strict";
//https://leetcode.com/problems/binary-tree-inorder-traversal/
Object.defineProperty(exports, "__esModule", { value: true });
//Left-Root-Right Traversal https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/
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
function inorderTraversal(root) {
    const generator = _inorderTraversalStack(root);
    const arr = [];
    let done = false;
    while (done === false) {
        const gen = generator.next();
        if (!gen.done) {
            arr.push(gen.value);
        }
        else {
            done = gen.done;
        }
    }
    return arr;
}
function* _inorderTraversalStack(head) {
    if (head !== null) {
        const stack = new Stack();
        let current = head;
        stack.push(current);
        let traversalLeft = true;
        while (!stack.isEmpty()) {
            if (traversalLeft) {
                while (current.left !== null) {
                    stack.push(current);
                    current = current.left;
                }
            }
            yield current.val;
            if (current.right !== null) {
                current = current.right;
                traversalLeft = true;
            }
            else {
                current = stack.pop();
                traversalLeft = false;
            }
        }
    }
}
class Stack {
    items = [];
    push(el) {
        this.items.push(el);
    }
    pop() {
        const element = this.items.pop();
        return element;
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
