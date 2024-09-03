//* Given: string, contains digits from 2-9 inclusive(включительно)
//? Return: all possible letters combinations that the number could represent, any order

//!constraits:
//0 <= digits.length <= 4
//digits[i] is a digit in the range ['2', '9'].

// - 2 abc 3 - def, 4 - ghi, 5 - jkl, 6 - mno, 7 - pqrs, 8 - tuv, 9 - wxyz

// Example 1:

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

class LetterGraphVertice {
  value: string;
  adjacesVertices: LetterGraphVertice[];

  constructor(val: string) {
    this.value = val;
    this.adjacesVertices = [];
  }

  addLink(vertex: LetterGraphVertice) {
    if (!this.isLinked(vertex)) {
      this.adjacesVertices.push(vertex);
      vertex.adjacesVertices.push(this);
    }
  }

  isLinked(vertex: LetterGraphVertice) {
    return this.adjacesVertices.includes(vertex);
  }
}

class LetterGraph {
  vertices: LetterGraphVertice[] = [];

  addVertex(val: string) {
    const exVertex = this.getVertex(val);
    if (!exVertex) {
      const vertex = new LetterGraphVertice(val);
      this.vertices.push(vertex);
      return vertex;
    }
    return exVertex;
  }

  getVertex(val: string) {
    return this.vertices.find((x) => x.value === val);
  }

  addEdge(val1: string, val2: string) {
    const v1 = this.getVertex(val1);
    const v2 = this.getVertex(val2);

    if (v1 !== undefined && v2 !== undefined) {
      v1.addLink(v2);
    }
  }

  dfs(startChar: string) {
    const visited: string[] = [];
    const combinations: string[] = [];

    this.recursiveDfs(startChar, visited, combinations);

    return combinations;
  }

  recursiveDfs(current: string, visited: string[], combinations: string[]) {
    visited.push(current);
    const currentVertex = this.getVertex(current)!; // a

    const neighbours = currentVertex.adjacesVertices; // def
    let end = true;

    // for (let i = 0; i < neighbours.length; i++) {
    //   const next = neighbours[i].value;

    //   if (!visited.includes(next)) {
    //     end = false;
    //     this.recursiveDfs(next, visited, combinations);
    //   }
    // }
    // if (end) {
    //   combinations.push(visited.join(""));
    //   visited.pop();
    // }
  }
}

function letterCombinations(digits: string): string[] {
  const combos: string[] = [];
  const digitsMap = new Map<string, string[]>([
    ["2", ["a", "b", "c"]],
    ["3", ["d", "e", "f"]],
    ["4", ["g", "h", "i"]],
    ["5", ["j", "k", "l"]],
    ["6", ["m", "n", "o"]],
    ["7", ["p", "q", "r", "s"]],
    ["8", ["t", "u", "v"]],
    ["9", ["w", "x", "y", "z"]],
  ]);

  const letterGraph = new LetterGraph();

  for (let i = 0; i < digits.length; i++) {
    const letters = digitsMap.get(digits[i])!;
    const nextLetters = digits?.[i + 1]
      ? digitsMap.get(digits[i + 1])
      : undefined;

    const level1 = letters.map((l) => letterGraph.addVertex(l));
    if (i === 0) {
      letterGraph.addVertex("");
      level1.forEach((v) => letterGraph.addEdge("", v.value));
    }
    const level2 = nextLetters?.map((l) => letterGraph.addVertex(l));

    if (level2) {
      level1.forEach((v1) => {
        level2.forEach((v2) => v1.addLink(v2));
      });
    }
  }

  return combos;
}
