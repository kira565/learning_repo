// https://wcademy.ru/two-pointers-method/
// Метод двух указателей

//Он подойдёт для решения задач,
// где упоминаются отсортированные массивы (или связные списки), связанные с парами/тройками значений или даже подмассивами.

//Дан массив целых чисел, необходимо вернуть индексы двух чисел, сумма которых равна заданному числу.
//Можно считать, что массив будет иметь ровно одно решение. Нельзя использовать одно и то же число дважды.
const array3 = [2, 7, 11, 15];
const summ = 9;
// result [0, 1]

//Для случая, когда массив чисел упорядочен, идеально подойдёт подход с двумя указателями. Сначала
//левый указатель указывает на начало массива, а правый на его конец. Если их сумма равна целевому значению, то мы выходим, если нет, то:

//если сумма больше целевого значения, то нам нужна меньшая сумма (логично, да?) и мы сдвигаем левее правый указатель
//если сумма меньше целевого значения, то мы сдвигаем левый указатель, чтобы её увеличить

export function twoPointers(nums: number[], target: number) {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;

  while (leftPointer < rightPointer) {
    const summ = nums[leftPointer] + nums[rightPointer];
    if (summ === target) {
      return [leftPointer, rightPointer];
    }

    if (target > summ) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }
}
export function isPalindrome(s: string): boolean {
  const regex = /[A-Za-z]/;
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const testLeft = regex.test(s[left]);
    const testRight = regex.test(s[right]);
    console.log(left, right, s[left], s[right]);
    if (!testLeft || !testRight) {
      if (!testLeft) {
        left++;
      }
      if (!testRight) {
        right--;
      }
      continue;
    }

    if (s[left].toLowerCase() === s[right].toLocaleLowerCase()) {
      left++;
      right--;
      continue;
    } else {
      return false;
    }
  }
  return true;
}
