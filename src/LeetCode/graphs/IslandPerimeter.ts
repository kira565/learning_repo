export function islandPerimeter(grid: number[][]): number {
  const packCell = (x: number, y: number) => `${x}:${y}`;
  const unpackCell = (cell: string) =>
    cell.split(":").map((cord) => parseInt(cord, 10));
  const visited = new Set<string>();

  const isCellValid = (x: number, y: number) => {
    if (!inGrid(x, y)) {
      return false;
    }

    const cell = packCell(x, y);
    if (visited.has(cell)) {
      return false;
    }
    return true;
  };

  const inGrid = (x: number, y: number) => {
    if (y < 0 || y >= grid.length) {
      return false;
    }
    if (x < 0 || x >= grid[y].length) {
      return false;
    }
    return true;
  };

  const isCellEarth = (x: number, y: number) => {
    return grid?.[y]?.[x] === 1;
  };

  // map reproduce cell and current perimeter
  let perimeter = 0;
  let currentStep = new Set<string>();
  const y = Math.floor(grid.length / 2);
  const initialCell = packCell(
    Math.floor(grid[y].length / 2),
    Math.floor(grid.length / 2)
  );
  currentStep.add(initialCell);
  visited.add(initialCell);
  while (currentStep.size > 0) {
    const nextStep = new Set<string>();

    const tryFindEarth = ([x, y]: [number, number]) => {
      if (isCellValid(x, y)) {
        const cell = packCell(x, y);
        nextStep.add(cell);
        visited.add(cell);
      }
    };
    const scanEarth = (xy: [number, number][]) => {
      return xy.find(([x, y]) => isCellEarth(x, y));
    };
    const isEveryWhereEarth = (xy: [number, number][]) => {
      return xy.every(([x, y]) => isCellEarth(x, y));
    };

    const moveEarth = ([x, y]: [number, number]) => {
      const left: [number, number] = [x - 1, y];
      const lefttop: [number, number] = [x - 1, y - 1];
      const right: [number, number] = [x + 1, y];
      const rightTop: [number, number] = [x + 1, y - 1];
      const down: [number, number] = [x, y + 1];
      const leftdown: [number, number] = [x - 1, y + 1];
      const up: [number, number] = [x, y - 1];
      const rightdown: [number, number] = [x + 1, y + 1];
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
        } else {
          return cell;
        }
      }
      return undefined;
    };

    for (const cell of currentStep) {
      const [x, y] = unpackCell(cell);
      const left: [number, number] = [x - 1, y];
      const right: [number, number] = [x + 1, y];
      const down: [number, number] = [x, y + 1];
      const up: [number, number] = [x, y - 1];

      if (isCellEarth(x, y)) {
        const l = moveEarth(left);
        const r = moveEarth(right);
        const u = moveEarth(up);
        const d = moveEarth(down);
        if (nextStep.size == 0) {
          if (l) {
            nextStep.add(l);
          } else if (r) {
            nextStep.add(r);
          } else if (u) {
            nextStep.add(u);
          } else if (d) {
            nextStep.add(d);
          }
        }
      } else {
        const earthScanned = scanEarth([left, right, down, up]);
        if (earthScanned !== undefined) {
          tryFindEarth(earthScanned);
        } else {
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
