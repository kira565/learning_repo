function maximumOddBinaryNumber(s: string): string {
  let res = "";
  let founded = false;
  for (let char of s) {
    if (char === "1" && !founded) {
      founded = true;
      continue;
    }

    if (char === "1") {
      res = res.replace(/^/, char);
    }
    if (char === "0") {
      res = res + char;
    }
  }
  if (founded) {
    res = res + "1";
  }
  return res;
}
