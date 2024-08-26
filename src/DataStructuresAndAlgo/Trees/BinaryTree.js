"use strict";
// https://ru.hexlet.io/courses/algorithms-trees/lessons/binary/theory_unit#:~:text=%D0%91%D0%B8%D0%BD%D0%B0%D1%80%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%20%D0%B8%D0%BB%D0%B8%20%D0%B4%D0%B2%D0%BE%D0%B8%D1%87%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE,%D1%82%D0%BE%D0%B6%D0%B5%20%D0%BF%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B0%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%20%D1%81%D0%BE%D0%B1%D0%BE%D0%B9%20%D0%B1%D0%B8%D0%BD%D0%B0%D1%80%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE.&text=%D0%94%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%20(%D0%B0)%20%E2%80%94%20%D0%B1%D0%B8%D0%BD%D0%B0%D1%80%D0%BD%D0%BE%D0%B5.,%D1%82%D0%BE%D0%B6%D0%B5%20%D0%BD%D0%B5%20%D0%B1%D0%BE%D0%BB%D0%B5%D0%B5%20%D0%B4%D0%B2%D1%83%D1%85%20%D0%B4%D0%BE%D1%87%D0%B5%D1%80%D0%BD%D0%B8%D1%85.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = exports.BinaryTreeNode = void 0;
const StackAndQueue_1 = require("../StackAndQueue");
// Binary trees.
// Binary tree structure allows to break the limits of Linear structures
// For example in linear structures its not possible to make insert and search operations fast in the same time.
// But in hierarchical structure its possible to select and update big amounts of data fast
// The most popular hierarchical structure - Binary Tree.
// Besides of search, they are used in mathematical operations and computer programs
// They are also used to store data for compression algorithms,
// Moreover, they are the basis of the other data structures such as priority queues,
// heeps and dictionaries.
// Binary tree - двоичное дерево this is the tree, which nodes have no more than two child nodes
// Moreover, every child node represents another binary tree itself
// As soon as rule about maximum 3 child nodes is broken, the tree is no longer binary.
// Because there are always only 2 child nodes they are called left and right
// Remind ourselves, that there are completed and full trees (Завершенное и полное)
// For binary trees they looks like the following:
// Completed tree - this is binary tree where every level except the last one is completed.
// And compliting of the last level is from left to right
// Full Binary Tree - this is the binary tree, where every node has two or zero child nodes.
// Practically, two types of Binary trees are used most often than others: The Binary Tree Of Search and The Binary Heep
// In this article we are going to concentrate on first type.
// What is The Buinary Tree Of Search
// They are different to other trees that they keep sorted data. Storing of data inside this tree organized with
// following rules:
// 1. All data inside the nodes of left child under-tree is lesser than inside the parent node
// 2. All data inside the nodes of tight child under-tree is bigger than inside the parent node
// 3. Every child node also represents Binary Tree Of Search.
// Thanks to this structure of storing data, search inside this tree takes O(log N),
// This is significantly lesser than storing inside the lists O(n)
// If sorted array will be used, search complexity will be the same. But still,
// Insert operations are slower than in the tree, O(n) vs O(log N).
// Such strong effectivity of this tree only works if tree is balanced.
// It means all levels, besides the last one are completed.
// Lets implement Binary tree code
//Lets remind the basics:
// 1. No more than 2 child nodes,
// 2. Child nodes are also binary
// 3. Child nodes are called Left and Right
// Generally we can perform following operations with Binary Tree Of Search
// 1. Search
// 2. Insert
// 3. Remove
// 4. Tree iteration
// class BinaryTreeNode<T> {
//   parent: BinaryTreeNode<T>;
//   left: BinaryTreeNode<T> | null;
//   right: BinaryTreeNode<T> | null;
//   value: T;
//   constructor(value: T, parent: BinaryTreeNode<T>) {
//     this.left = null;
//     this.right = null;
//     this.value = value;
//     this.parent = parent;
//   }
// OK, lets start implementing operations
// Lets start from Search
//   search(val: T) {
//     let node = this as BinaryTreeNode<T> | null;
//     while (node) {
//       if (val === node.value) return node;
//       else if (val < node.value) {
//         node = node.left; // if the search value lesser than node vlaue, it can be located only in left tree
//       } else if (val > node.value) {
//         node = node.right; // otherwise right side;
//       }
//     }
//     return null;
//   }
// Insert. All values lesser than current we need to place in left side, and bigger in right side.
// To insert new node we need to check if current node is not empty. Then there are two ways:
// 1. If this is true, compare current value with inserting value. As result of caomparing,
// perform the check of right tree and left tree.
// 2. If node is empty, create a new one and fill the link to current node as parent
//   insertNode(value: T) {
//     return this.#insertNode(value, this);
//   }
//   #insertNode(value: T, parentNode: BinaryTreeNode<T>) {
//     if (value < parentNode.value) {
//       if (parentNode.left === null) {
//         parentNode.left = new BinaryTreeNode(value, parentNode);
//       } else {
//         this.#insertNode(value, parentNode.left);
//       }
//     } else if (value > parentNode.value) {
//       if (parentNode.right === null) {
//         parentNode.right = new BinaryTreeNode(value, parentNode);
//       } else {
//         this.#insertNode(value, parentNode.right);
//       }
//     }
//   }
// Removing
// In Linked list, to remove node we need to find its link to the next element and
// move this link to previous
// If we need to remove root node or middle vertex of binary tree and save its structure
// Usually one of the following meethods is chosen:
// 1. Search and remove maximal element of the left undertree and use its value as root or middle vertex node
// 3. Search and remove minimal element of the right undertree and use its value as root or middle vertex node
// Заменить корневой узел максимальным значением левого поддерева или
// Заменить корневой узел минимальным значением правого поддерева
// To understand cleatly check pic https://cdn2.hexlet.io/derivations/image/original/eyJpZCI6ImU4MWEyNTJkMDBjNWIyMzkzNDYzMDZjMzk0OTlmMDYyLnBuZyIsInN0b3JhZ2UiOiJjYWNoZSJ9?signature=c67ccc6b528cf69c48c078d4af6aaccdb7bff30b1e3ae2982011f1703e5e4bc8
// For this tree both methods are possible, lets pick second option
//   removeNode(val: T) {
//     return this.#removeNode(val, this);
//   }
//   #removeNode(val: T, node: BinaryTreeNode<T> | null) {
//     if (node === null) {
//       return null;
//     }
//     if (val < node.value) {
//       node.left = this.#removeNode(val, node.left);
//     } else if (val > node.value) {
//       node.right = this.#removeNode(val, node.right);
//     } else {
//       if (node.left === null) return node.right;
//       else if (node.right === null) return node.left;
//     }
//     let original = node;
//     node = node.right;
//     while (node?.left) {
//       node = node.left;
//     }
//     node?.right = this.#removeMin(original.right);
//     node?.left = original.left;
//   }
//   #removeMin(node: BinaryTreeNode<T>) {
//     if (node.left === null) {
//       return node.right;
//     }
//     node.left = this.#removeMin(node.left);
//     return node;
//   }
// }
class BinaryTreeNode {
    val;
    left;
    right;
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
exports.BinaryTreeNode = BinaryTreeNode;
class BinaryTree {
    root;
    constructor() {
        this.root = null;
    }
    inOrderTraversal(action, isRecursive = true) {
        //Поведение: Обходит дерево в инфиксном порядке, выполняя указанное действие над каждым узлом.
        //Сложность: O(n)
        //Порядок обхода: 1, 2, 3, 4, 5, 6, 7, 8
        //Инфиксный обход используется тогда, когда нам надо обойти дерево в порядке, соответствующем значениям узлов
        //мы обходим значения от самого маленького до самого большого. То есть от левых поддеревьев к правым через корень.
        if (isRecursive) {
            this.inorderRecursive(action);
        }
        else {
            this.inorderStack(this.root);
        }
    }
    inorderRecursive(handlerFunction) {
        this._inorderInternal(this.root, handlerFunction);
    }
    *inorderStack(head) {
        // Это нерекурсивный алгоритм.
        // Он использует стек для того, чтобы избежать рекурсии.
        if (head !== null) {
            // Стек для сохранения пропущенных узлов.
            const stack = new StackAndQueue_1.Stack();
            let current = head;
            // Когда мы избавляемся от рекурсии, нам необходимо
            // запоминать, в какую стороны мы должны двигаться.
            let isTreverseLeft = true;
            // Кладем в стек корень.
            stack.push(current);
            while (!stack.isEmpty()) {
                // Если мы идем налево...
                if (isTreverseLeft) {
                    // Кладем все, кроме самого левого узла на стек.
                    // Крайний левый узел мы вернем с помощю yield.
                    while (current.left !== null) {
                        stack.push(current); // нужно подчеркнуть чтобы вернуться успешно в корень и пойти направо мы добавили тут в стек два раза корневой узел
                        // потому что конда он там один и мы поднимаемся вверх по дереву мы достаем его а стак пустой и цикл хуй идет дальше
                        current = current.left;
                    }
                }
                // Префиксный порядок: left->yield->right.
                yield current.val;
                // Если мы можем пойти направо, идем.
                if (current.right != null) {
                    current = current.right;
                    // После того, как мы пошли направо один раз,
                    // мы должным снова пойти налево.
                    isTreverseLeft = true;
                }
                else {
                    // Если мы не можем пойти направо, мы должны достать родительский узел
                    // со стека, обработать его и идти в его правого ребенка.
                    current = stack.pop();
                    isTreverseLeft = false;
                }
            }
        }
    }
    _inorderInternal(currentNode, handlerFunction) {
        if (currentNode === null)
            return;
        this._inorderInternal(currentNode.left, handlerFunction);
        handlerFunction(currentNode.val);
        this._inorderInternal(currentNode.right, handlerFunction);
    }
    insertItem(val) {
        const newNode = new BinaryTreeNode(val);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }
    _insertNode(currentNode, newNode) {
        if (newNode.val < currentNode.val) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            }
            else {
                this._insertNode(currentNode.left, newNode);
            }
        }
        if (newNode.val >= currentNode.val) {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            }
            else {
                this._insertNode(currentNode.right, newNode);
            }
        }
    }
    search(val) {
        let currentNode = this.root;
        if (currentNode === null) {
            return null;
        }
        while (currentNode) {
            if (currentNode.val === val) {
                return currentNode;
            }
            else {
                if (val < currentNode.val) {
                    currentNode = currentNode.left;
                }
                else if (val > currentNode.val) {
                    currentNode = currentNode.right;
                }
            }
        }
        return null;
    }
    // Удаление элемента
    // Идея удаления элемента делится на несколько случаев:
    // у узла нет дочерних узлов;
    // у узла есть левый дочерних узлов;
    // у узла есть правый дочерних узлов;
    // у узла есть оба ребёнка.
    // В случае 1 просто удаляем узел, дополнительная работа не требуется.
    // В случае 2 и 3 заменяем удаляемый узел на его потомка, на этом удаление заканчивается. Случай 4 самый сложный,
    //  но концепция такого удаления довольно проста — найти в правом поддереве минимальный элемент и переместить его на место удаляемого узла.
    // И как удалить какой-то узел, если мы уже находимся в потомке не очень понятно.
    // Идейно удаление довольно просто, но мы знаем что работа с деревом обычно происходит через рекурсивные вызовы.
    // Идея реализации удаления следующая. Спускаемся на уровень ниже, вызывая функцию рекурсивно,
    // при этом присваивая обрабатываемому элементу, то что вернёт функция удаления.
    // Начало алгоритма удаления — поиск в дереве удаляемого элемента. При этом идея присваивания возвращаемого элемента из функции
    //  _deleteNode применяется сразу.
    deleteNode(val) {
        if (this.root === null) {
            return null;
        }
        // при первом вызове не знаем куда пойдём, просто вызываем функцию для корня
        // из этого вызова  _deleteNode
        // вернётся первый параметр(this.root), если удаляем не корень
        this.root = this._deleteNode(this.root, val);
        // при следующих вызовах у нас такой код, в зависимости от того
        // в какое поддерево мы проваливаемся, до начала процедуры удаления
        //currentNode.left = this._deleteNode(currentNode.left, itemValue);
    }
    _findMinElement(currentNode) {
        console.log(currentNode);
        if (currentNode.left === null) {
            return currentNode;
        }
        return this._findMinElement(currentNode.left);
    }
    _deleteNode(currentNode, itemValue) {
        // если нашли нужный элемент, начинаем процедуру удаления
        if (currentNode.val === itemValue) {
            // обработка самого простого случая, вместо узла возвращается null
            if (currentNode.left === null && currentNode.right === null) {
                return null;
            }
            // обработка двух случаев, с только одним из поддеревьев
            if (currentNode.left === null) {
                return currentNode.right;
            }
            if (currentNode.right === null) {
                return currentNode.left;
            }
            // если у ноды есть оба потомка
            const minNodeRight = this._findMinElement(currentNode.right);
            console.log(minNodeRight);
            //  console.log(minNodeInRightSubtree, currentNode.right);
            // заменили текущий элемент минимальным из правого поддерева
            currentNode.val = minNodeRight.val;
            // ищем в правом поддереве минимальный элемент,
            // значение которого уже вставлено на место текущего
            currentNode.right = this._deleteNode(currentNode.right, minNodeRight.val);
            return currentNode;
        }
        // попадаем сюда, если элемент не был найден,
        // просто проваливаемся в дерево глубже и глубже
        // производится рекурсивный вызов этой же функции,
        // при этом если элемент не будет найден,
        // то алгоритм просто будет возвращать существующую ссылку на поддерево,
        // которая присвоится в ту же позицию
        if (itemValue < currentNode.val) {
            if (currentNode.left === null) {
                return currentNode;
            }
            // проваливаемся в левое поддерево,
            // после рекурсивной отработки функции _deleteNode
            // будет возвращен текущий элемент,
            // который в предыдущем вызове будет присвоен
            currentNode.left = this._deleteNode(currentNode.left, itemValue);
            return currentNode;
        }
        // itemValue > currentNode.value
        // аналогичная обработка для правого поддерева
        if (currentNode.right === null) {
            return currentNode;
        }
        currentNode.right = this._deleteNode(currentNode.right, itemValue);
        return currentNode;
    }
}
exports.BinaryTree = BinaryTree;
