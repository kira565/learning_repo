"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SameTree_easy_1 = require("./LeetCode/graphs/SameTree-easy");
const _2occMaxStrEz_1 = require("./LeetCode/search/slidingWindow/2occMaxStrEz");
const nodeA = new SameTree_easy_1.TreeNode(1, new SameTree_easy_1.TreeNode(2), new SameTree_easy_1.TreeNode(3));
const nodeB = new SameTree_easy_1.TreeNode(1, new SameTree_easy_1.TreeNode(2), new SameTree_easy_1.TreeNode(3));
console.log((0, _2occMaxStrEz_1.maximumLengthSubstring)("ccbcb"));
