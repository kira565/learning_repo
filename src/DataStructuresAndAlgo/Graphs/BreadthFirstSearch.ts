//https://ru.hexlet.io/courses/algorithms-graphs/lessons/in-breadth-search/theory_unit

// BFS Algorithm

// Lers imagine that we develop the game where character needs
// achieve the target point in the map with obstracts препядствиями

// Computer needs to make a shortest route to target point
// taking into obstractles

// BFS will helps us here

// Проходимые препядствия - дорога поле тропинка
// Непроходимые - река лес гора

// Usually game characters allowed to move up bottom left right
// But sometimes its allowed to move diagonally
// so we need route в виде цепочки клеток

//При поиске в глубину мы проверяем соседнюю вершину далее ее соседнюю вершину
// И таким образом двигаемся к искомой точе

// При поиске в ширину же мы двигаемся по другому
// Равномерно во все стороны !!! проверяя сначала ближайшие вершины затем следующие за ними и так далее

// Возьмем карту с персонажем которая содержит клетки в клетке находится наш персонаж а также всякие препядствия в какой то клетке лежит ресурс
// цель - найти ресурс
// Алгоритм будет примерно таким
//1 Осматриваем все соседние с персонажем клетки ;(в нашей игре будет разрещено двигается вверх влево вправо вниз)
//2 если в соседних клетках нет ресурса то двигаемся дальше и осматриваем соседей
//3 на серии рисунков на хекслет видно как расширяется область вокруг персонажа
//4 на очередном шаге мы добрались до ресурса поиск закончен
//5 теперь мы можем восстановить путь двигаясь назад по клеткам

// Разберемся как искать соседей на каждом шаге
//1 возюмем как пример один из шагов мы видим синие клетки те которые мы проверям на текущем шаге
// и светлозеленые это соседи сверху снизу справа слева от синих

// некоторые из них проверять не нужно так как они уже проверены другие могут встречаться
// в списке более двух раз потому что например они могут находится слеваот одной клетки и слева от другой
// для наглядности закрасим клетки желтые - уже проверенные и зеленые - которые являются общими соседями

// В реализации нам понадобится два множества
// В первое попадут уже проверенные клетки = таких соседей мы будем пропускать
// Во второе множество пойдут все оставшиеся и это будет Сэт так как элементы встречаются не больше одного раза
// Иными словами во второе множество пойдут все остальные клетки зеленые и светло зеленые

// НЕЯВНЫЕ ГРАФЫ
// Осталось разобраться как получить граф из карты
// карта это двумерный массив клеток
// В каждой клетке хранится код который определяет что это за клетка например 0 - дорога 1 - гора 2 - лес итд

// Кажется что подойдет список смежности из урока про поиск в глубину но на карте соседей клетки можно определить толькор
// зная ее координаты

//Из рисунка видно, что по соседству с голубой клеткой a[i][j] находятся четыре зеленые клетки с такими координатами:
// a[i - 1][j]
// a[i][j - 1]
// a[i][j + 1]
// a[i + 1][j]
//Эти координаты можно вычислить, но при этом нужно учитывать два обстоятельства.
// 1 - не у каждой клетки есть соседи есть крайние клетки например слева и слева у нее не будет соседей
// 2 - мы можем рассматривать только проходимые клетки -  с кодом соответствующим дороге тропинке или чистому полю

// чтобы идентифицировать верщину нам нужно две цифры - строка и столбец клетки
// при этом нам не надо в явном виде хранить вершины и ребра графа

//Если соседние вершины можно вычислить на основании дополнительной информации,
// то мы говорим, что граф представлен в неявном виде — речь идет о неявном графе.

// РЕАЛИЗАЦИЯ
interface Cell {
  x: number;
  y: number;
}
// карта представляет собой двумерный прямоугольный массив с числами похоже на матрицу
// предположим что 0 - это проходимая клетка
// все остальные чиал - непроходимые клетки
const map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

// на вход берем карту клетку старта и клетку цели
export const bfs = (map: number[][], from: Cell, to: Cell) => {
  // Эти функции нужны изза особенности джаваскрипта. клетки представляют собой координаты икс и игрик
  // мы не можем использовать их как ключи set потому что ключ - одно значение
  // объект тоже не прокатит так как в джс два объекта не равны друг другу даже с одинаковыми свойствами
  // поэтому тут подойдет либо джойн в строку либо хэш функция используем джойн в строку и анджойн:
  const pack = (x: number, y: number) => `${x}:${y}`;
  const unpack = (cell: string) =>
    cell.split(":").map((coord) => parseInt(coord, 10));

  // весь алгоритм представляет собой один большой цикл
  // перед циклом создаем словарь
  const visited = new Set();

  // функцтя проверяет является ли клетка валидным соседом
  const isValidNeighbour = (x: number, y: number) => {
    if (y < 0 || y >= map.length) {
      // икс не выходит за границы карты
      return false;
    }

    if (x < 0 || x >= map[y].length) {
      // map[x] ~~ [1,2,3,4,5,6] - row // т е игрек выходит за пределы карты
      return false;
    }

    const cell = pack(x, y);
    if (visited.has(cell)) {
      return false;
    }

    return map[y][x] === 0; // 0 - проходимая клетка
  };

  // Клетки которые мы рассматриваем на каждом шаге мы помещаем в словарь
  // В самом начале мы кладем туда единственную клетку с которой начинаем поиск
  // в качестве значения помещаем массив в котором храним путь
  // в самом начале путь - это наша первая единственная клетка
  let currentStep = new Map<string, string[]>();
  const initialCell = pack(from.x, from.y);
  currentStep.set(initialCell, [initialCell]);

  // На каждом шаге алгоритма мы убеждаемся что в словаре есть клетки
  // Если словаь пуст значит мы осмотрели все клетки до которых могли добраться но не нашли путь
  // поэтому вернем null
  while (currentStep.size > 0) {
    // если в словаре есть клетки готовим следующий шаг
    // готовим новый словарь для заносим клетки на следующем шаге
    const nextStep = new Map<string, string[]>();
    // функция проверяет что переданная ей клетка - нормальный сосед
    const tryAddCell = (x: number, y: number, path: string[]) => {
      if (isValidNeighbour(x, y)) {
        const cell = pack(x, y);
        const newPath = [...path];
        // если это так добавляем ее к построенному пути и к множеству посещенных клеток
        newPath.push(cell);
        nextStep.set(cell, newPath);
        visited.add(cell);
      }
    };
    // основной цикл
    // извлекаем все клетки и соответствующие им пути из шага
    for (const [cell, path] of currentStep) {
      const [x, y] = unpack(cell);
      // распаковываем и проверяем не добрались ли мы до конца
      if (x === to.x && y === to.y) {
        // если добрались сразу же возвращаем путь
        return path;
      }

      // в противном случае пытаемся добавить клетку для следующего наша сверху снизу слева и справа
      tryAddCell(x - 1, y, path);
      tryAddCell(x + 1, y, path);
      tryAddCell(x, y - 1, path);
      tryAddCell(x, y + 1, path);
    }
    // подменяем старый словарь шаг на новый шаг
    currentStep = nextStep;
  }
  return null;
};
