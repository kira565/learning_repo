//* Given: n pairs of parentheses "()" - pair
// ? Write a function to generate all combinations of well-formed parentheses

//Input: n = 3
//Output: ["((()))","(()())","(())()","()(())","()()()"]

// backtracking, dynamic programming
//! constraits:
// 1 <= n <= 8
// well-formed (())
// not well-formed  )()(, (())())
// ()()()-close immidiately
// ((())) - close later
// ()
// [(, (, (, ),),)]

// 1. ()()() - дефолт, все скобки по отдельности

//Берем одну скобку оборачиваем оставшиеся в нее разными вариантами: ()()   <-- ()

// (())() первая
// ()(()) вторая
// (()()) обе

//? если бы было больше;
// третья ()()(())
//

// борачиваем в 2 скобки () <--- (())
//((()))

//Рекурсия пускаем каждую скобку по кругу пока она не сузится до одной скобки без вложенных типа ((()))
// ()()()

// (()),()   ((),())    (),(())
// ((()))   ((()))    ((()))

// ()()()()

// (()),(),()   ((),()),()     (),((),())       (),(),(())

//                                  () () () ()

// ( () ) () () 1                    ( () () ) () - dupl           () ( () () )  4                () () ( () ) 5
// ( () () ) () 2                                                  ( () () () ) - dupl           () ( () () ) - dupl
// ( () () () ) 3

// 2 - ((())) ()
// 3 ( (()) () )

// () () () ()

// (() () () ()) (()()())() ()(()()()) ()(()())() _

// () () () )()

function generateParenthesis(n: number): string[] {
  //if (n < 1) return [];
  //if (n === 1) return ["()"];
  const output = new Set<string>();
  const initial = Array(n).fill("()"); // ["()", "()", "()", "()"] 4
  // ( () ) () ()

  function buildQuery(currentScope: number, left: string[]) {
    const str = left.join("");
    if (output.has(str)) {
      return;
    } else {
      output.add(str);
    }
  }

  buildQuery(0, initial);

  return Array.from(output.values());
}
