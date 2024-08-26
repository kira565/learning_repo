"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskGraph {
    vertices = new Map();
    addVertexex(v1, v2) {
        if (!this.vertices.has(v1)) {
            this.vertices.set(v1, new Set());
        }
        if (!this.vertices.has(v2)) {
            this.vertices.set(v2, new Set());
        }
        this.vertices.get(v1).add(v2);
        this.vertices.get(v2).add(v1);
    }
    dfs(start, end) {
        const visited = new Set();
        return this._dfs(start, end, visited);
    }
    _dfs(current, end, visited) {
        visited.add(current);
        const set = this.vertices.get(current);
        console.log(set, end);
        if (set.has(end)) {
            console.log("da");
            return true;
        }
        else {
            for (const value of Array.from(set)) {
                if (!visited.has(value)) {
                    const acheived = this._dfs(value, end, visited);
                    if (acheived) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
function validPath(n, edges, source, destination) {
    const graph = new TaskGraph();
    if (source === destination) {
        return true;
    }
    for (const [v1, v2] of edges) {
        graph.addVertexex(v1, v2);
    }
    return graph.dfs(source, destination);
}
console.log(validPath(10, [
    [4, 3],
    [1, 4],
    [4, 8],
    [1, 7],
    [6, 4],
    [4, 2],
    [7, 4],
    [4, 0],
    [0, 9],
    [5, 4],
], 5, 9));
