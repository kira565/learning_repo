// Hash
// https://ru.hexlet.io/courses/basic-algorithms/lessons/hash/theory_unit
//
//Но и это не предел. Если поиск нужно выполнять
// с максимальной скоростью, мы можем воспользоваться
//еще одной структурой данных.
//Это хэш-таблица, которая обеспечивает временную сложность .

import { LinkedListImpl } from "../Data Structures and Algo/SinglyLinkedList";

//Хэш-таблица похожа на массив, потому что в ней тоже есть
//операция индексации. В JavaScript доступ к элементу массива
//осуществляется по индексу, записанному в квадратных скобках.
//В качестве индекса можно использовать последовательные целые
//числа. В случае с хэш-таблицей в качестве индекса можно брать
//любые структуры данных — строки, дату и время, массивы.

//Разреженные массивы
//Простейший способ определить столицу по году основания —
//использовать массив:
let capitals = [];

capitals[881] = "Вена";
capitals[1237] = "Берлин";
capitals[1323] = "Вильнюс";
capitals[1614] = "Тирана";
//Такой массив занимает много памяти.
//В нем хранится всего 4 города,
//но при этом размер массива — это целых 11614 элементов:
//Если мы применим массив, доступ к элементам выполнится
//очень быстро — за константное время 0(1). Но при этом мы впустую расходуем
//память — в нашем примере массив заполнен всего на 0,8%.

//Массивы, в которых большая часть элементов не определена,
//называются разреженными. Чтобы сэкономить память,
//программисты стараются уплотнить массив.
//Скажем, в нашем примере годы находятся достаточно далеко
//друг от друга — на каждые двадцать пустых элементов
//приходится только один элемент с данными. Мы
//можем уменьшить массив в двадцать раз с помощью простого трюка.

//Возьмем числа 0, 1, 2 и 3, поделим их на 20 и получим такой результат:
// 0 / 20 = 0, 1 / 20 = 0.05, 2 / 20 = 0.1, 3 / 20 = 0,15
//Целая часть этих чисел будет равна 0, пока мы не доберемся до такой операции:
//19/20 = 0.95
//Начиная с 20, целая часть после деления будет равна 1:
// 20/20 = 1
//Начиная с 40, целая часть будет равна 2.
//Получается, что после преобразования числа схлопываются:
//Чтобы получать целую часть, воспользуемся стандартной функцией Math.floor:
let capitalsHash: string[] = [];
capitalsHash[Math.floor(881 / 20)] = "Вена";
capitalsHash[Math.floor(1237 / 20)] = "Берлин";
capitalsHash[Math.floor(1323 / 20)] = "Вильнюс";
capitalsHash[Math.floor(1614 / 20)] = "Тирана";
//Чтобы узнать, какой город основан в 1323 году, мы проверяем элемент с индексом 1323/20:
const getCity = (year: number) => capitalsHash[Math.floor(year / 20)];

let city = getCity(1323);
console.log(city);
//Для чисел 0 до 1999 нам достаточно массива из ста элементов.
//Последний элемент такого
//уплотненного массива имеет индекс 99, а Math.floor(1999/20) как раз равно 99.
//Но в другой задаче это может не сработать — например,
//если требуется хранить в массиве индексы, равные миллиону или миллиарду.
//Коэффициент 20 слишком мал для таких чисел, потому
//что даже уплотненный массив все равно будет слишком большим и слишком пустым.

//Модульная арифметика
//Предположим, мы фиксируем размер массива.
//Пусть у нас будет массив из ста элементов:
let capitals3 = new Array<string>(100);
//Мы хотим сохранить в него несколько элементов, но их индексы могут быть
//произвольными целыми числами. Чтобы преобразовать
//индекс в число от 0 до 99, мы должны вычислить остаток от деления индекса на 100.
capitals3[881 % 100] = "Вена";
capitals3[1237 % 100] = "Берлин";
capitals3[1323 % 100] = "Вильнюс";
capitals3[1614 % 100] = "Тирана";
capitals3[1167 % 100] = "Копенгаген";
capitals3[963 % 100] = "Люксембург";
capitals3[1067 % 100] = "Минск";
capitals3[1191 % 100] = "Дублин";
capitals3[1275 % 100] = "Амстердам";
capitals3[752 % 100] = "Ватикан";
capitals3[1786 % 100] = "Рейкьявик";
capitals3[1200 % 100] = "Варшава";
capitals3[1872 % 100] = "Будапешт";
capitals3[856 % 100] = "Мадрид";
capitals3[1147 % 100] = "Москва";
//Коллизия
const getCity3 = (year: number) => capitals3[year % 100];
//Теперь мы точно знаем, что наш массив не вырастет до больших размеров,
//как это может случиться с операцией деления.
//Но мы можем обнаружить другую проблему.
//Попробуем узнать, какой город основан в 1167 году.
//Если верить нашей таблице, это Копенгаген. Но программа говорит совсем другое:
let city3 = getCity3(1167); // Minsk
console.log(city3);

//Минск основан в 1067 году, а Копенгаген — в 1167.
//Годы отличаются, но у них один и тот же остаток от деления на 100, а именно 67.
//Ситуация, когда разные элементы после преобразования индекса попадают
//в одну и ту же ячейку массива, называется коллизией.
//На самом деле это не ошибка, а вполне вероятная ситуация, хотя и не очень частая.

//Коллизии
//Справиться с коллизиями нетрудно. Вместо того чтобы хранить в каждой ячейке
//массива простое значение, мы размещаем там односвязный список.
//При добавлении элемента мы добавляем в список пару из года и города:
//Год — это индекс, по которому мы сохраняем и извлекаем данные.
//Обычно его называют ключом
//Название — это значение
//Попробуем реализовать в коде:
const capitalsHashWithoutColissius = Array<LinkedListImpl<any>>(100);

function setCapital(year: number, city: string) {
  const index = year % capitalsHashWithoutColissius.length;
  if (!(index in capitalsHashWithoutColissius)) {
    capitalsHashWithoutColissius[index] = new LinkedListImpl();
  }
  if (index in capitalsHashWithoutColissius) {
    capitalsHashWithoutColissius[index].add({ key: year, value: city });
  }
}
//Мы уже разработали структуру данных LinkedList,
//поэтому мы можем просто импортировать ее.
//Размер массива capitals всегда будет равен ста элементам.
//По умолчанию все ячейки массива пусты,
//и связный список создается только при первой записи в ячейку.
//В каждом списке может храниться несколько элементов. Чтобы различать их,
//мы сохраняем не просто значение, а пару из ключа (key) и значения (value).
//При поиске точно также вычисляем индекс:

function getCapital(year: number) {
  const hash = year % capitalsHashWithoutColissius.length;
  const list = capitalsHashWithoutColissius[hash];
  if (list) {
    let current = list.head;
    while (current && current.next !== null) {
      if (current.value.key === year) {
        return current.value.value;
      }
      current = current.next;
    }
  }
  return undefined;
}
setCapital(881, "Vena");
setCapital(1237, "Berlin");
setCapital(1323, "Vilnus");
setCapital(1067, "Minsk");
setCapital(1167, "Kopengagen");
console.log(capitalsHashWithoutColissius);
console.log(getCapital(1167));
// Если в ячейке ничего нет, значит, мы ничего и не записывали.
// Но если в ячейке что-то есть, то это список,
// по которому мы пробегаем и пытаемся найти пару с заданным ключом (key).
// Обнаружив пару, возвращаем ее значение (value).
// Алгоритмическая сложность этих операций зависит от того,
// насколько часто элементы попадают в одну
// и ту же ячейку — в один и тот же связный список.

// Если у нас будет случайный набор из ста чисел, он достаточно
// равномерно распределится по массиву: в большинстве ячеек будет
// храниться одно число, в некоторых — два, и в некоторых — ни одного.
// Алгоритмическая сложность записи и чтения в таком случае будет
// близка к  — это один из самых быстрых возможных алгоритмов.

// Если числа не будут случайными, может получиться так, что в одном
// из списков их окажется слишком много — тогда скорость вставки и
// проверки значительно снизится. Подробнее мы обсудим эту ситуацию
// позже, а пока запомним, что предложенный нами алгоритм любит равномерные
// случайные ключи.

// Хэш-функция
// Теперь попробуем решить обратную задачу —
// определять год основания столицы, зная ее название. Заглянем
// в таблицу в начале урока и вспомним, что год основания Мадрида — 856, а Москвы — 1147.

// Наша структура данных может хранить значения с любым целочисленным ключом,
// не только с годом. Но «Мадрид» и «Москва» — это не числа, а строки.

// При этом компьютеры умеют работать только с числами, и любые объекты в
//  них хранятся как последовательности чисел. Каждая буква хранится как одно число,
//  которое называют кодом символа:
const capital = "Мадрид";
for (let i = 0; i < capital.length; i++) {
  console.log(capital.charCodeAt(i));
}
// Слово «Мадрид» хранится как последовательность чисел 1052, 1072, 1076, 1088, 1080
// и 1076. В простейшем случае мы могли бы использовать для вычисления индекса код
// первой буквы — в нашем примере 1052. Но это значит все города на
// М (Мадрид, Москва и Минск) попадут в один и тот же список. В таком случае
// скорость поиска будет не очень высокой.

// Чтобы этого избежать, нам нужны ключи, которые очень похожи на случайные.
// Мы можем взять все наши числа и подвергнуть их какой-нибудь обработке — например,
//  вычислить их сумму или произведение.

// Однако сложение и умножение — слишком простые операции.
// Все слова, состоящие из одних и тех же букв (ведро, вроде и древо),
// будут иметь один и тот же ключ — сумму или произведение кодов символов.
//Хороший результат в таком случае даст так называемая полиномиальная функция.
// На практике для ускорения вычислений и для удобства используют
// не все выражение, а только остаток от его деления на другое число — m:
const hash = (s: string) => {
  const k = 65537;
  const m = 2 ** 20;

  let result = 0;
  let k_i = 1;
  for (let i = 0; i < s.length; i++) {
    result = (result + k_i * s.charCodeAt(i)) % m;
    k_i = (k_i * k) % m;
  }

  return result;
};
// Функция называется hash, и это неслучайно.
// В переводе с английского слово hash означает «мелко крошить, перемешивать».
//Функция перемешивает исходные данные так, чтобы получилось число, похожее на случайное:

// В Python для вычисления хешей можно использовать функцию hash(),
// в Java — метод hashCode(), в C# — метод GetHashCode().
// В JavaScript нет готовой хеш-функции — считается, что все нужное уже есть в языке.

// Название функции дало название всей структуре данных. Обычно ее называют хеш-таблицей
//  (hash table или hashmap). Очень часто это название сокращают просто до хеша.
//  Другие распространенные названия — словарь (dictionary) и
//  ассоциативный массив (associative array).

// Худший случай
// Выше мы говорили, что обычно вставка и поиск в хеш-таблице выполняются за время .
// Но если хеш-функция выбрана неудачно, все значения могут оказаться в одном связном
// списке во внутреннем массиве.
// Тогда время поиска составит , что обычно считается медленным.
// К счастью, эта ситуация практически невозможна. Тем не менее, если вы соберетесь
// писать собственную хеш-таблицу, посвятите время выбору хорошей хеш-функции.

// Есть еще одна возможная сложность. В массиве, который мы использовали в примерах выше,
// мы резервировали сто элементов, потому что рассчитывали, что данные будут распределены
// равномерно. Однако если мы поместим в такой массив 10000 элементов, то даже при идеальном
// распределении в каждом связном списке окажется сто элементов. Это значит, что поиск и вставка
// все-таки будут медленными.

// Чтобы справиться с этой проблемой, надо расширять хеш-таблицу
// — увеличивать внутренний массив по мере того, как в нее добавляются элементы.
// Конечно, это накладно делать при каждой вставке.

// Обычно подсчитывают коэффициент заполнения хеш-таблицы (load factor) —
// это частное от деления количества вставленных элементов на размер внутреннего массива.
// Если он достигает заранее выбранного порога в 60–80%, внутренний массив увеличивают вдвое,
// а индексы всех элементов пересчитывают.

// Точно также, если коэффициент заполнения становится слишком маленьким,
// 20–25%, массив уменьшают вдвое. У массива есть нижняя граница в 128 или 256 элементов,
// чтобы не перестраивать его слишком часто, пока он маленький.

// Implementation of hash table

export class HashTable<T extends { name: string; year: number }> {
  private table: LinkedListImpl<T>[] = [];
  private count = 0;

  hash(s: string) {
    const k = 65537;
    const m = 2 ** 20;

    let result = 0;
    let power = 1;
    for (let i = 0; i < s.length; i++) {
      result = (result + power * s.charCodeAt(i)) % m;
      power = (power * k) % m;
    }

    return result;
  }

  calculateIndex(table: LinkedListImpl<T>[], key: string) {
    return this.hash(String(key)) % table.length;
  }

  rebuildTableIfNeed() {
    if (this.table.length === 0) {
      this.table.length = 128;
    } else {
      const loadFactor = this.count / this.table.length;
      if (loadFactor >= 0.8) {
        const newTable = Array(this.table.length * 2);
        for (let list in this.table) {
          let currentNode = this.table[list].head;
          while (currentNode !== null) {
            const idx = this.calculateIndex(newTable, currentNode.value.name);
            if (!(idx in newTable)) {
              newTable[idx] = new LinkedListImpl();
            }
            newTable[idx].add(currentNode.value);
            currentNode = currentNode.next;
          }
        }
        this.table = newTable;
      }
    }
  }

  set(key: any, value: T) {
    this.rebuildTableIfNeed();

    const idx = this.calculateIndex(this.table, key);
    if (!(idx in this.table)) {
      this.table[idx] = new LinkedListImpl();
    }

    this.table[idx].add(value);
    this.count++;
  }

  get(key: string) {
    const hash = this.calculateIndex(this.table, key);
    if (hash in this.table) {
      const list = this.table[hash];
      const value = list.search((val: T) => val.name === key);
      return value;
    }

    return undefined;
  }

  length() {
    return this.count;
  }
}

const example = new HashTable();
example.set("Pikachu", { name: "Pikachu", year: 1067 });
example.set("Charmonder", { name: "Charmonder", year: 1167 });
example.set("Bulbazaur", { name: "Bulbazaur", year: 1167 });
example.set("Diplodog", { name: "Diplodog", year: 1167 });
example.set("Duremar", { name: "Duremar", year: 1167 });
const pokemon = example.get("Charmonder");

console.log(example);
console.log(Math.abs(-1));
