"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.islandPerimeter = void 0;
function islandPerimeter(grid) {
    const packCell = (x, y) => `${x}:${y}`;
    const unpackCell = (cell) => cell.split(":").map((cord) => parseInt(cord, 10));
    const visited = new Set();
    const isCellValid = (x, y) => {
        if (!inGrid(x, y)) {
            return false;
        }
        const cell = packCell(x, y);
        if (visited.has(cell)) {
            return false;
        }
        return true;
    };
    const inGrid = (x, y) => {
        if (y < 0 || y >= grid.length) {
            return false;
        }
        if (x < 0 || x >= grid[y].length) {
            return false;
        }
        return true;
    };
    const isCellEarth = (x, y) => {
        return grid?.[y]?.[x] === 1;
    };
    // map reproduce cell and current perimeter
    let perimeter = 0;
    let currentStep = new Set();
    const y = Math.floor(grid.length / 2);
    const initialCell = packCell(Math.floor(grid[y].length / 2), Math.floor(grid.length / 2));
    currentStep.add(initialCell);
    visited.add(initialCell);
    while (currentStep.size > 0) {
        const nextStep = new Set();
        const tryFindEarth = ([x, y]) => {
            if (isCellValid(x, y)) {
                const cell = packCell(x, y);
                nextStep.add(cell);
                visited.add(cell);
            }
        };
        const scanEarth = (xy) => {
            return xy.find(([x, y]) => isCellEarth(x, y));
        };
        const isEveryWhereEarth = (xy) => {
            return xy.every(([x, y]) => isCellEarth(x, y));
        };
        const moveEarth = ([x, y]) => {
            const left = [x - 1, y];
            const lefttop = [x - 1, y - 1];
            const right = [x + 1, y];
            const rightTop = [x + 1, y - 1];
            const down = [x, y + 1];
            const leftdown = [x - 1, y + 1];
            const up = [x, y - 1];
            const rightdown = [x + 1, y + 1];
            const isEarth = isCellEarth(x, y);
            if (!isEarth || !inGrid(x, y)) {
                perimeter++;
            }
            if (isCellValid(x, y) && isEarth) {
                const isUselessToGo = isEveryWhereEarth([
                    left,
                    right,
                    down,
                    up,
                    lefttop,
                    rightTop,
                    leftdown,
                    rightdown,
                ]);
                const cell = packCell(x, y);
                visited.add(cell);
                if (!isUselessToGo) {
                    nextStep.add(cell);
                }
                else {
                    return cell;
                }
            }
            return undefined;
        };
        for (const cell of currentStep) {
            const [x, y] = unpackCell(cell);
            const left = [x - 1, y];
            const right = [x + 1, y];
            const down = [x, y + 1];
            const up = [x, y - 1];
            if (isCellEarth(x, y)) {
                const l = moveEarth(left);
                const r = moveEarth(right);
                const u = moveEarth(up);
                const d = moveEarth(down);
                if (nextStep.size == 0) {
                    if (l) {
                        nextStep.add(l);
                    }
                    else if (r) {
                        nextStep.add(r);
                    }
                    else if (u) {
                        nextStep.add(u);
                    }
                    else if (d) {
                        nextStep.add(d);
                    }
                }
            }
            else {
                const earthScanned = scanEarth([left, right, down, up]);
                if (earthScanned !== undefined) {
                    tryFindEarth(earthScanned);
                }
                else {
                    tryFindEarth(left);
                    tryFindEarth(right);
                    tryFindEarth(down);
                    tryFindEarth(up);
                }
            }
        }
        currentStep = nextStep;
    }
    return perimeter;
}
exports.islandPerimeter = islandPerimeter;
