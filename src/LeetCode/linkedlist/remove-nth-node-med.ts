class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

//* Given: linked list
//? Remove n-th node from the END of the list and return head
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let current = head;
  let removingPrev = null;
  let removing = head;
  let nCounter = n + 1;
  //keep reference to node wich is n steps back
  while (current !== null) {
    current = current.next;
    n--;
    if (nCounter < 0) {
      removingPrev = removing;
      removing = removing!.next;
    }
  }

  console.log(removingPrev, removing, removing?.next);

  return head;
}
