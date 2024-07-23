"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashTable_1 = require("./Data Structures and Algo/HashTable");
var validanagram_eqsy_1 = require("./LeetCode/hash/validanagram-eqsy");
var table = new HashTable_1.HashTable();
var a = table.hash("anagram");
var b = table.hash("nagaram");
console.log("COMPARE", a, b);
console.log((0, validanagram_eqsy_1.isAnagram)("anagram", "nagaram"));
