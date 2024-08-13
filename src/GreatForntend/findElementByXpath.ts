function fundElementByXPath(xpath: string) {
  const xpathArr = xpath.split("/");
  let currentNode: Element | Document = document;

  for (let i = 0; i < xpathArr.length; i++) {
    const elem = xpathArr[i];
    const [tagName, index] = elem.split("[");
    const numericIndex = parseFloat(index);
    const tagChildren: Element[] = Array.from(currentNode.children).filter(
      (el) => el.tagName.toLowerCase() === tagName
    );

    if (!index) {
      const tagChild = tagChildren?.[0];
      if (!tagChild) return -1;

      currentNode = tagChildren?.[0];
    } else {
      const res = tagChildren.find((_, idx) => idx + 1 === numericIndex);
      if (!res) return -1;
    }
  }

  return currentNode;
}
