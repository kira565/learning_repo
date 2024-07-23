"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumLengthSubstring = void 0;
const SinglyLinkedList_1 = require("../../../Data Structures and Algo/SinglyLinkedList");
class TaskHashTable {
    table = [];
    count = 0;
    hash(s) {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            const char = s.charCodeAt(0);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }
    calculateHashIndex(s) {
        return this.hash(String(s)) % this.table.length;
    }
    rebuildTableIfNeed() {
        if (this.table.length === 0) {
            this.table.length = 128;
        }
        else {
            const loadFactor = this.count / this.table.length;
            if (loadFactor >= 0.8) {
                const newTable = Array(this.table.length * 2);
                for (let list of this.table) {
                    let current = list.head;
                    while (current !== null) {
                        const idx = this.calculateHashIndex(current.value.val);
                        if (!(idx in newTable)) {
                            newTable[idx] = new SinglyLinkedList_1.LinkedListImpl();
                        }
                        newTable[idx].add(current.value);
                        current = current.next;
                    }
                }
                this.table = newTable;
            }
        }
    }
    set(val) {
        this.rebuildTableIfNeed();
        const hash = this.calculateHashIndex(val.val);
        if (!(hash in this.table)) {
            this.table[hash] = new SinglyLinkedList_1.LinkedListImpl();
        }
        this.table[hash].add(val);
        this.count++;
    }
    get(val) {
        const hash = this.calculateHashIndex(val);
        if (hash in this.table) {
            return this.table[hash].search((tableVal) => tableVal.val === val);
        }
        return undefined;
    }
    getListVal(val) {
        const hash = this.calculateHashIndex(val);
        if (hash in this.table) {
            return this.table[hash];
        }
        return undefined;
    }
    clear() {
        this.table = [];
        this.count = 0;
    }
}
function maximumLengthSubstring(s) {
    let biggestLength = 0;
    let length = 0;
    let startIndex = 0;
    const hashTable = new TaskHashTable();
    for (let i = startIndex; i < s.length; i++) {
        const llist = hashTable.getListVal(s[i]);
        if (llist == undefined || llist.length() < 2) {
            hashTable.set({ val: s[i], index: i });
            length++;
            if (i !== 0) {
                console.log(s[i], length);
            }
        }
        else {
            if (length > biggestLength) {
                biggestLength = length;
            }
            i = llist.head.next.value.index;
            console.log(i, "NEW CYCLE");
            hashTable.clear();
            length = 0;
        }
    }
    if (length > biggestLength) {
        biggestLength = length;
    }
    return biggestLength;
}
exports.maximumLengthSubstring = maximumLengthSubstring;