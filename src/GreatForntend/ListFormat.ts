export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean }
): string {
  let str: string = "";
  let list: Array<string> = items;

  function formatArray(items: string[], length: number): string {
    let str = "";
    const diff = items.length - length;
    for (let i = 0; i < length; i++) {
      if (items[i].length > 0) {
        if (i === 0) {
          str += items[i];
        } else {
          if (diff === 0 && i === length - 1) {
            str += " and " + items[i];
          } else {
            str += ", " + items[i];
          }
        }
      }
    }
    if (diff > 0) {
      const others = (diff - 1) % 10 === 0 ? " other" : " others";
      str += " and " + diff + others;
    }
    return str;
  }
  if (options) {
    if (options.unique === true) {
      list = Array.from(new Set(items));
    }
    if (options.sorted === true) {
      list.sort();
    }
  }
  if (options?.length && options.length > 0) {
    const legthFixed =
      options.length <= list.length ? options.length : list.length;
    str = formatArray(list, legthFixed);
  } else {
    console.log(list);
    str = formatArray(list, list.length);
  }
  return str;
}
