class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// * Given:
// two linked list represents a number in reverse order,
// need to return linked list in same order to represent thir summ
//Constraits:
// no leading zeros
//range: [1,100]
// 0 <= node.val <=9
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let current1 = l1; //leading
  let previous: ListNode | null = null;

  let current2 = l2;
  let addDozen = false;

  while (current1 !== null || current2 !== null || addDozen) {
    let summ = 0;

    if (current2 == null && !addDozen) {
      break;
    }

    summ = (current1?.val ?? 0) + (current2?.val ?? 0) + (addDozen ? 1 : 0);

    if (summ >= 10) {
      addDozen = true;
      summ -= 10;
    } else {
      addDozen = false;
    }

    if (current1) {
      current1.val = summ;
    } else if (previous !== null) {
      previous.next = new ListNode(summ, null);
      current1 = previous.next;
    }

    previous = current1;
    current1 = current1?.next ?? null;
    current2 = current2?.next ?? null;
  }

  return l1;
}

//? Recursive short solution from leetcode
function addTwoNumbersRecursive(
  l1: ListNode | null,
  l2: ListNode | null,
  carry: number = 0
): ListNode | null {
  if (!l1 && !l2 && !carry) return null;

  var total: number = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + (carry || 0); // summ 1 + 1 +
  carry = parseInt(total / 10 + ""); //idk but should be просто единиичка (десяток)
  return new ListNode(
    total % 10, // остаток от деления на 10
    addTwoNumbersRecursive(l1?.next ?? null, l2?.next ?? null, carry)
  );
}
