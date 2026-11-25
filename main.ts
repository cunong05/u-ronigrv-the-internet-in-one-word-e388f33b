// The Internet in One Word — make.fun bounty entry.
// Writes a single word to /output/entry.txt.
// Node 22+ stdlib only. No network, no randomness, no time.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_WORD = "enshittification";
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function validate(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${word.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word (no spaces or newlines)");
  }
}

validate(ENTRY_WORD);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY_WORD, "utf8");

// Read back and assert the file is byte-identical to the entry word.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== ENTRY_WORD) {
  throw new Error(
    `read-back mismatch: expected ${JSON.stringify(ENTRY_WORD)}, got ${JSON.stringify(written)}`,
  );
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(ENTRY_WORD, "utf8")) {
  throw new Error("read-back byte length mismatch");
}
console.log(`Wrote ${ENTRY_WORD.length}-character entry to ${OUTPUT_FILE}`);
