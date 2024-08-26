"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedListImpl = exports.LinkedListNode = void 0;
class LinkedListNode {
    value;
    next; //Ссылка на следующий узел
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
exports.LinkedListNode = LinkedListNode;
class LinkedListImpl {
    head = null;
    constructor(...values) {
        for (let i = values.length - 1; i >= 0; i--) {
            this.add(values[i]);
        }
    }
    // ADD TO BEGINING- COMPLEXITY O(1)
    add(value) {
        //В обоих случаях (вставка в пустой и непустой список), сначала мы создаем узел,
        //куда, в качестве указателя на следующий элемент, записываем текущее значение head.
        //Метод add принимает параметр value (значение). Он создает новый узел,
        // помещает туда значение и вставляет узел в начало списка.
        this.head = new LinkedListNode(value, this.head);
        return this.head;
    }
    // INSERT - COMPLEXITY O(n)
    // Insert to the mid or end, complexity is higher than array, because we cannot access
    // element immidiately, we need iterate all nodes to understand where we need to insert
    insert(index, value) {
        if (this.head === null) {
            // no element case, just create head
            this.head = new LinkedListNode(value, this.head);
            return this.head;
        }
        else if (index <= 0) {
            // adding to start, just add
            return this.add(value);
        }
        else {
            let currentNode = this.head; // begin from head
            // index > 1 - we iterate from head (start) to incom index so
            //if we need to put at index 4, we have 3 iterations [3,2,1] get D push next
            // while (currentNode.next !== null && index > 1) {
            //   currentNode = currentNode.next;
            //   --index;
            // }
            //same like while above just more understandable for me
            // if weachieve end of list, we add to the end, optionally we can throw error
            for (let i = 0; i < index - 1; i++) {
                if (currentNode.next !== null) {
                    currentNode = currentNode.next;
                }
            }
            // here in the same moment we define new next for curr element , create a new elem and
            // adding new next to next element
            currentNode.next = new LinkedListNode(value, currentNode.next);
            return currentNode.next;
        }
    }
    // SEARCH - COMPLEXITY - O(n)
    // in arrays index uses very often, in case of list index doesnt matter, Although anyway we can find formally index
    // we are looking for value
    contains(value) {
        if (this.head === null) {
            return false;
        }
        let currentNode = this.head;
        while (currentNode.next !== null) {
            if (currentNode.value === value) {
                return true;
            }
            else {
                currentNode = currentNode.next;
            }
        }
        return false;
    }
    search(searchCb) {
        if (this.head === null) {
            return undefined;
        }
        let currentNode = this.head;
        while (currentNode !== null) {
            if (searchCb(currentNode.value)) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    }
    // INDEXING - COMPLEXITY - O(n)
    // unlike an array we dont know exact length of list, so we need to calculate
    length() {
        let length = 0;
        if (this.head !== null) {
            let currentNode = this.head;
            while (currentNode !== null) {
                currentNode = currentNode.next;
                length++;
            }
        }
        return length;
    }
    // REMOVE FROM START - COMPLEXITY O(1)
    remove() {
        if (this.head === null) {
            return undefined;
        }
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }
    // REMOVE FROM MID OR END - COMPLEXITY O(n)
    removeAtIndex(index) {
        if (index < 0) {
            throw Error("Negative index not exist");
        }
        else if (this.head === null) {
            return undefined;
        }
        else if (index === 0 || this.head.next === null) {
            // If first element || If last element
            return this.remove();
        }
        let currentNode = this.head;
        //currentNode - node before
        //current.next - node removing
        //current.next.next - node after
        for (let i = 0; i < index - 1; i++) {
            // we need to check if node after removing elem exists, otherwise current.next will be removing entity
            if (currentNode.next.next !== null) {
                currentNode = currentNode.next;
            }
            else
                break;
        }
        const value = currentNode.next.value;
        //Единственное нововведение по сравнению с предыдущим кодом заключается в том, что при удалении узла из середины, нам нужно просматривать список на два элемента вперед
        currentNode.next = currentNode.next.next; // so we ar removing required element at next and assign next value after removing element (next.next)
        return value;
    }
}
exports.LinkedListImpl = LinkedListImpl;
