// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/html-serializer
type Element = { tag: string; children: Array<string | Element> };

export default function serializeHTML(element: Element): string {
  const resultingArray: string[] = [];

  function createTag(tag: string, level: number, isTag = true, isOpen = true) {
    return `${new Array(level).fill("\t").join("")}${isTag ? (isOpen ? `<${tag}>` : `</${tag}>`) : tag}`;
  }

  function dfs(node: Element | string, level: number) {
    if (typeof node === "string") {
      resultingArray.push(createTag(node, level, false));
    } else {
      resultingArray.push(createTag(node.tag, level, true, true)); // идем в глубину (открываем теги)
      node.children.forEach((child) => dfs(child, level + 1)); // go deeper (recursive dfs)
      resultingArray.push(createTag(node.tag, level, true, false)); // возвращаемся из глубины (закрываем теги)
    }
  }

  dfs(element, 0);
  return resultingArray.join("\n");
}
