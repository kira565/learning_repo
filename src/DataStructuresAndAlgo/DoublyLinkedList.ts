//Двусвязный список
//В каждом узле двусвязного списка хранится две ссылки — на следующий и на
//предыдущий узел. Кроме того, в нем хранятся ссылки
//и на голову списка (первый элемент), и на его хвост (последний элемент):

//PERKS
// 1. Вставка и удаление в конце списка становятся настолько же быстрыми,
//как и в начале. Теперь они выполняются за константное время

// 2. Вставка узла перед заданным узлом становится такой же простой операцией,
//как и вставка после

class DoublyLinkedListNode<T> {
  value: T;
  prev: DoublyLinkedListNode<T> | null;
  next: DoublyLinkedListNode<T> | null;
  constructor(
    value: T,
    prev: DoublyLinkedListNode<T> | null,
    next: DoublyLinkedListNode<T> | null
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class DoublyLinkedList<T> {
  head: DoublyLinkedListNode<T> | null = null;
  tail: DoublyLinkedListNode<T> | null = null;

  //   При вставке каждого следующего узла в начало, head всегда будет указывать на новый узел. Значение tail при этом не изменится, потому что хвост списка остается прежним. Поле next новой головы списка будет указывать на прежнюю голову,
  //   а в поле previous старой головы вместо null должен появиться адрес новой головы:
  insertBegin(value: T) {
    if (this.head === null) {
      const node = new DoublyLinkedListNode(value, null, null);
      this.head = node;
      this.tail = node;
    } else {
      // Создавая узел, мы сразу записываем в поле next текущее значение this.head — текущую голову.
      const node = new DoublyLinkedListNode(value, null, this.head);
      // Поле previous текущей головы должно ссылать на новый узел, за это отвечает такая строка:
      this.head.prev = node;
      //Наконец, новый узел становится новой головой списка:
      this.head = node;
    }
  }

  insertEnd(value: T) {
    if (this.tail === null) {
      const node = new DoublyLinkedListNode(value, null, null);
      this.head = node;
      this.tail = node;
    } else {
      const node = new DoublyLinkedListNode(value, this.tail, null);
      this.tail.next = node;
      this.tail = node;
    }
  }

  removeBegin() {
    if (this.head === null) {
      return undefined;
    }

    const result = this.head.value;

    // if only  1 element
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
    }
    return result;
  }

  removeEnd() {
    if (this.tail === null) {
      return undefined;
    }

    const result = this.tail.value;

    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    }

    return result;
  }

  isEmpty() {
    return this.head === null;
  }

  // ITERATOR
  // Чтобы просуммировать элементы из разных структур данных, сейчас достаточно написать всего одну функцию. (sum)
  // Это стало возможным благодаря итераторам. Обычно итерацией в программировании называют отдельный шаг цикла. Но у слова есть и другое значение.
  fore() {
    let iterator: any = {
      current: this.head,
    };

    iterator[Symbol.iterator] = function* () {
      while (this.current != null) {
        yield this.current.value;

        this.current = this.current.next;
      }
    };

    return iterator;
  }
}

const list1 = new DoublyLinkedList();
list1.insertBegin(1);
console.log(list1);
list1.insertBegin(1);
// const sum = (items: any) => {
//   let result = 0;
//   console.log(items);
//   for (const item of items) {
//     result = result + item;
//   }
//   return result;
// };

// console.log(sum(list1.fore())); // => 10
