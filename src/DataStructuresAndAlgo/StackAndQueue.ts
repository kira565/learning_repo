// Мы привыкли записывать мат выражения опираясь на скобки и приоритет операций
// eg 3+2*5 or (3+2) * 5 etc
// польский математик предложил записывать в виде обратной полькой записи
// (3+2)*(4+5) в польской записи будет 3245++* операторы не всегда могут быть в конце
//32+45+*
//Преимущество обратных выражений в том, что они не вызывают разночтения.

import { DoublyLinkedList } from "./DoublyLinkedList";

//Алгоритм вычисления очень прост, но требует новой для нас структуры данных.
//Представьте, что в вычислениях выше мы бы записывали каждое число на карточки и
//складывали бы из них стопку. Наверху стопки лежало бы число 45.
//В программировании такие стопки называются стеком —
//от английского stack, то есть стопка или кипа.

//В стеке, как и в стопке, мы имеем дело только с верхней карточкой — вершиной.
//Задача, которую решает стек —
//запомнить промежуточный результат для будущих вычислений.

//В отличие от ранее изученных нами структур,
//стек обычно реализуют поверх других структур — массива или односвязного списка.

// Реализация стека через массив
// Реализуя структуру данных, разработчик ради удобства может добавить в нее дополнительные методы.

// Разные реализации могут быть непохожи друг на друга, но мы всегда ожидаем найти основные методы
//— конечно, у разных структур они разные. У стека должны быть реализованы три обязательных метода:

// Метод push() помещает элемент на вершину стека, как карточку наверх стопки

// Метод pop() убирает элемент с вершины и возвращает его

// Метод isEmpty() проверяет, пуст ли стек
export class Stack<T> {
  public items: Array<T> = [];

  push(el: T) {
    this.items.push(el);
  }

  pop() {
    const element = this.items.pop();
    return element;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

//Воспользуемся нашим стеком, чтобы вычислить значение выражения  32+45+*
const stack = new Stack<number>();
const expression = "4 2 / 10 2 /";
const arrayExpresions = expression.split(" ");
for (const expres of arrayExpresions) {
  let a: number;
  let b: number;
  switch (expres) {
    case "+":
      b = stack.pop()!;
      a = stack.pop()!;
      stack.push(a + b);
      break;
    case "-":
      b = stack.pop()!;
      a = stack.pop()!;
      stack.push(a - b);
      break;
    case "*":
      b = stack.pop()!;
      a = stack.pop()!;
      stack.push(a * b);
      break;
    case "/":
      b = stack.pop()!;
      a = stack.pop()!;
      stack.push(a / b);
      break;
    default:
      stack.push(parseFloat(expres));
  }
} // [45]
console.log(stack);

//Если лексема — это знак операции,
//то мы «снимаем» с вершины стека два числа, выполняем операцию и помещаем результат обратно на стек.

//При выполнении операций важно обращать внимание на порядок чисел. Числа в стеке расположены в порядке, обратном тому, (pop убирает элемент с вершины, поэтому 4 2 вначале вернет 2)
//в котором мы их туда помещали. Поэтому сначала мы извлекаем второй операнд b, а потом первый a.
//

// IMPLEMENTATION WITH LINKED LIST SINGLY
class SinglyLinkedList<T> {
  head: any;
  ///impl
  insertBegin(val: T) {}
  removeBegin(val: T) {}
}

class StackByList<T> {
  items = new SinglyLinkedList<T>();

  push(val: T) {
    this.items.insertBegin(val);
  }
  pop(val: T) {
    this.items.removeBegin(val);
  }
  length() {
    return this.items.head === null;
  }
}

// IMPLEMENTATION WITH QUEUE DOUBLY LIST

export class QueueByList<T> {
  items = new DoublyLinkedList<T>();
  size = 0;

  push(val: T) {
    this.items.insertEnd(val);
    this.size++;
  }
  pop() {
    this.size--;
    return this.items.removeBegin();
  }
  isEmpty() {
    return this.items.head === null;
  }
}

//Отличие в том, что в стеке элементы вставляются и извлекаются с одного конца. В очереди элементы
//вставляются с одного конца, а извлекаются из другого.
