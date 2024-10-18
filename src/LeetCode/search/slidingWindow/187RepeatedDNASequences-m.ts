//* ## Given

//? The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.
//? - For example, `"ACGAATTCCG"` is a **DNA sequence**.

//? When studying **DNA**, it is useful to identify repeated sequences within the DNA.
//? Given a string `s` that represents a **DNA sequence**, return all the **`10`-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.

// ### Examples

// **Example 1:**

// **Input:** `s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`
// **Output:** `["AAAAACCCCC","CCCCCAAAAA"]`

// **Example 2:**

// **Input:** `s = "AAAAAAAAAAAAA"`
// **Output:** `["AAAAAAAAAA"]`

// ### Constraints:

// - `1 <= s.length <= 105`
// - `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.

function findRepeatedDnaSequences(s: string): string[] {
  const result: string[] = [];
  const hashes = new Set<number>();
  const power = new Array(s.length + 1).fill(1);

  for (let i = 1; i <= s.length; i++) {
    power[i] = (power[i - 1] * 26) % 1000000007;
  }

  function DNAhash() {
    let currentHash = 0;
    const windowSize = 10;
    const base = 26;
    const mod = 1000000007;

    return {
      addHash: function addCharToHash(s: string) {
        currentHash = (currentHash * base + s.charCodeAt(0)) % mod;
        return currentHash;
      },
      minusHash: function minusHash(s: string) {
        currentHash =
          (((currentHash - power[windowSize - 1] * s.charCodeAt(0)) % mod) +
            mod) %
          mod;
        return currentHash;
      },
    };
  }

  // initial window
  const hash = DNAhash();

  for (let i = 0; i < 10; i++) {
    const val = hash.addHash(s[i]);
    if (i === 9) hashes.add(val);
  }

  //sliding window
  for (let i = 10; i < s.length; i++) {
    //minus plus , check
    hash.addHash(s[i]);
    const h = hash.minusHash(s[i - 10]);

    if (hashes.has(h)) {
      result.push(s.slice(i - 10, i));
    } else {
      hashes.add(h);
    }
  }

  console.log(hashes);

  return result;
}
