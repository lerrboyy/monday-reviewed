// Monday, Reviewed in One Line — make.fun bounty entry.
// Writes the entry text (a one-line review of my own Monday) to
// <output dir>/entry.txt and verifies the file byte-for-byte.
// Node 22, no dependencies, no network, fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a one-star review of my own Monday. One line, 122 chars.
const ENTRY =
  "One star. My alarm snoozed itself, the bus left without me, and my inbox had tripled by 9am — Monday, would not recommend.";

const MAX_CHARS = 200;
const OUTPUT_FILE = "entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The gate counts characters, so validate the exact same way it does:
// code points, one line, no surrounding white space, no control characters.
function validateEntry(text: string): number {
  const charCount = [...text].length;

  if (charCount < 1 || charCount > MAX_CHARS) {
    fail(`entry is ${charCount} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only white space");
  }
  if (text !== text.trim()) {
    fail("entry must not start or end with white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      fail("entry must not contain control characters");
    }
  }
  return charCount;
}

function main(): void {
  const charCount = validateEntry(ENTRY);

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  // Create the output directory only. Never remove it: on the grader it is
  // a mount point, and deleting it throws EBUSY and fails the run.
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, OUTPUT_FILE);
  writeFileSync(outputPath, ENTRY, "utf8");

  // Read the file back and verify it byte-for-byte, then re-validate the
  // text as read, so a write that mangled the entry cannot slip through.
  const written = readFileSync(outputPath, "utf8");
  if (written !== ENTRY) {
    fail("verification failed: entry.txt does not match the entry text");
  }
  if (validateEntry(written) !== charCount) {
    fail("verification failed: entry.txt character count changed on disk");
  }

  console.log(`wrote ${outputPath} (${charCount} characters)`);
  console.log(ENTRY);
}

main();
