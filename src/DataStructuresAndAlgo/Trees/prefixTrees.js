"use strict";
// Prefix trees / Пркфиксные деревья
// https://ru.hexlet.io/courses/algorithms-trees/lessons/prefix/theory_unit
Object.defineProperty(exports, "__esModule", { value: true });
// Tree structures could be used for storing and organization of data
// Not only for solid data but also for groupable
//For example such data can include sequences of equivalent symbols
// Lets consider as entire point following words from dictionary:
// ОБЕСПЕЧИВАТЬ
// ОБЕСПЕЧИТЬ
// ОБЕСПЕЧИТЬСЯ
// All words above have the same prefix (they start with same character combination)
// So can consider it like tree structure:
//   ся <- ть <- Обеспечи -> вать
// Prefix trees are developed to organize data storing in this way.
// Prefix tree for this particular example:
// o -> об -> обе -> обес -> обесп -> обеспе -> обеспеч ->
// обеспечивать <- обеспечиват <- обеспечива <- обеспечив <-  |обеспечи| -> обеспечит -> обеспечить -> обечпечитьс -> обеспечиться
// Prefix trees help to predict user input - for example by suggesting a closest word considering char combination
// Prefix mechanism found its appliement in the internet ip routing schema:
// This is efficent to store IP addresses grouped by prefix
//              127 <- |null| -> 192 ->
//          1<- 0<- 0                         1 <- 0 <- 168 -> 10 -> 20
//RES 127.0.0.1                             192.168.0.1                192.168.10.20
// Structure of prefix trees:
// in the structure of prefix tree lets consider storing of words or associated arrays
// Prefix Tree is the tree, where every vertex marked by character and it has additional
// and it has terminal characteristic - каждая вершина помечена символом и имеет признак терминальности
// If we traverse inorder we have sequance of characters for particular word
// if recieved sequance is ended by terminal characteristic so achieved word exists in this data structure
//(если полученная последовательность заканчивается
// признаком терминальности то такое слово считается существующим в этой структуре данных)
// Moreover, two nodes could be linked with shared parent by the same chatacter
// Code:
class Trie {
    key;
    children;
    parent;
    end; // terminal characteristic (терминальность)
    constructor(key, parent) {
        this.key = key;
        this.children = new Map();
        this.parent = parent;
        this.end = false;
    }
    getWord() {
        let output = [];
        let node = this;
        while (node !== null) {
            output.unshift(node.key);
            if (node.parent) {
                node = node.parent;
            }
        }
        return output.join("");
    }
    // In Prefix Trees we can performe different operations: insert new word, word search, remove word
    /**
     * Search operation
     * @param word
     */
    contanis(word) {
        // For search operation, first we need to access root node. Usually we can consider that root value = null
        // Обычнос считается что значение корневой вершины равно пустоте
        // then we move through corresponding to next character pointers (перемещаемся по указателям соотв каждоый след букве)
        // в искомом слове
        // as far as all traversals are performed, we need to check flag end (проверка терминальности)
        // if flag exists we found search word
        let node = this;
        for (let i = 0; i < word.length; i++) {
            if (node.children.has(word[i])) {
                node = node.children.get(word[i]);
            }
            else {
                return false;
            }
        }
        return node.end;
    }
    // insert word
    insert(word) {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            if (!node.children.get(word[i])) {
                node.children.set(word[i], new Trie(word[i], node));
            }
            node = node.children.get(word[i]);
            if (i === word.length - 1) {
                node.end = true;
            }
        }
    }
    //remove word
    remove(word) {
        let node = this;
        const findWord = (node, word, index) => {
            if (index === word.length) {
                if (!node.end) {
                    return false;
                }
                node.end = false;
                return node.children.size === 0;
            }
            if (findWord(node.children.get(word[index]), word, index + 1)) {
                node.children.delete(word[index]);
                return !node.end && node.children.size === 0;
            }
            return false;
        };
        findWord(node, word, 0);
    }
}
