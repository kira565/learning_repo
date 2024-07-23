"use strict";
//https://ru.hexlet.io/courses/algorithms-graphs/lessons/in-breadth-search/theory_unit
Object.defineProperty(exports, "__esModule", { value: true });
exports.bfs = void 0;
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
const bfs = (map, from, to) => {
    // Эти функции нужны изза особенности джаваскрипта. клетки представляют собой координаты икс и игрик
    // мы не можем использовать их как ключи set потому что ключ - одно значение
    // объект тоже не прокатит так как в джс два объекта не равны друг другу даже с одинаковыми свойствами
    // поэтому тут подойдет либо джойн в строку либо хэш функция используем джойн в строку и анджойн:
    const pack = (x, y) => `${x}:${y}`;
    const unpack = (cell) => cell.split(":").map((coord) => parseInt(coord, 10));
    // весь алгоритм представляет собой один большой цикл
    // перед циклом создаем словарь
    const visited = new Set();
    // функцтя проверяет является ли клетка валидным соседом
    const isValidNeighbour = (x, y) => {
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
    let currentStep = new Map();
    const initialCell = pack(from.x, from.y);
    currentStep.set(initialCell, [initialCell]);
    // На каждом шаге алгоритма мы убеждаемся что в словаре есть клетки
    // Если словаь пуст значит мы осмотрели все клетки до которых могли добраться но не нашли путь
    // поэтому вернем null
    while (currentStep.size > 0) {
        // если в словаре есть клетки готовим следующий шаг
        // готовим новый словарь для заносим клетки на следующем шаге
        const nextStep = new Map();
        // функция проверяет что переданная ей клетка - нормальный сосед
        const tryAddCell = (x, y, path) => {
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
exports.bfs = bfs;