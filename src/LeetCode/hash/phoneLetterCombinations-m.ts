//* Given: string, contains digits from 2-9 inclusive(включительно)
//? Return: all possible letters combinations that the number could represent, any order

//!constraits:
//0 <= digits.length <= 4
//digits[i] is a digit in the range ['2', '9'].

// - 2 abc 3 - def, 4 - ghi, 5 - jkl, 6 - mno, 7 - pqrs, 8 - tuv, 9 - wxyz

// Example 1:

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

function letterCombinations(digits: string): string[] {
  const digitsArr: string[][] = [];

  // first we push relevant lines to array
  for (let i = 0; i < digits.length; i++) {
    switch (digits[i]) {
      case "2":
        digitsArr.push(["a", "b", "c"]);
        break;
      case "3":
        digitsArr.push(["d", "e", "f"]);
        break;
      case "4":
        digitsArr.push(["g", "h", "i"]);
        break;
      case "5":
        digitsArr.push(["j", "k", "l"]);
        break;
      case "6":
        digitsArr.push(["m", "n", "o"]);
        break;
      case "7":
        digitsArr.push(["p", "q", "r", "s"]);
        break;
      case "8":
        digitsArr.push(["t", "u", "v"]);
        break;
      case "9":
        digitsArr.push(["w", "x", "y", "z"]);
        break;
    }
  }

  function findCombos(digits: string) {
    const result: string[] = []; // result array which return all combinations
    const subset: string[] = []; // current subset eg [a -> d -> g]
    const visited = new Set<string>(); // visited characters like ["d"(visited), "e"(visited), "f"(not visited)]
    let i = 0; // starting index (we start from first set of chars in digits)

    calculateCombo(i, subset, visited, result);
    return result;
  }

  function calculateCombo(
    index: number,
    subset: string[],
    visited: Set<string>,
    result: string[]
  ) {
    const letters = digitsArr?.[index]; // get digits of current level

    if (letters) {
      // if level exists
      const char = letters.find((letter) => !visited.has(letter + index)); // find first non-visited (letter + index because can be 2 identical numbers eg "22"(abc, abc))
      if (char) {
        // if there is non visited char in a row
        subset.push(char); // push to subset
        index++;
        calculateCombo(index, subset, visited, result); // and go to forward line
      } else {
        //if all characters are visited in a row
        letters.forEach((l) => visited.delete(l + index)); // make them all unvisited for future combinations
        index--; // backtrack to previous row
        const popped = subset.pop()!; // character from prev row added to visited and popped from array
        visited.add(popped + index);
        calculateCombo(index, subset, visited, result);
        if (index < 0) {
          // if we backtrack to -1 level means we traversed all combinations
          return;
        }
      }
    } else if (!letters && index > 0) {
      // next level doesnt exist
      result.push(subset.join("")); // push subset to resulting array
      const popped = subset.pop()!; // pop last character
      index--; // backtrack to prev level
      visited.add(popped + index); // add last element to visited
      calculateCombo(index, subset, visited, result);
    }
  }

  return findCombos(digits);
}

//* leetcode easy short approach
function letterCombinationsLeetCodeBest(digits: string): string[] {
  if (digits.length === 0) return [];

  const phoneMap: string[] = [
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const output: string[] = [];

  function backtrack(combination: string, nextDigits: string) {
    if (nextDigits.length === 0) {
      // if no degets forward push combo
      output.push(combination);
    } else {
      const letters: string = phoneMap[parseInt(nextDigits[0]) - 2]; // get digits "abc"
      for (const letter of letters) {
        //* should think about recursion in cycle. In my approach its looks similar to dfs,
        //* here in cycle its more like bfs : 1. ["" -> a , "" -> b, "" -> c], [a->d a->e a->f, b->d, b->e, b->f, c->d c->e, c->f], [...]
        // "" + a, "" + b, "" + c
        backtrack(combination + letter, nextDigits.slice(1)); // next digits after slice (level completed) 123 ---> 23
      }
    }
  }

  backtrack("", digits);
  return output;
}
