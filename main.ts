// Two Lines to Your Past Self — make.fun bounty entry.
// Writes exactly two lines to /output/entry.txt:
// line 1 warns the writer's past self about one specific moment,
// line 2 says in one sentence why that moment mattered.

import { mkdirSync, writeFileSync } from "node:fs";

// Line 1: the warning — one specific moment (a date, a place, a decision).
const LINE_1 =
  "Don't sign the lease for the flat above the bakery on Nguyen Trai Street on the night of 14 March 2019.";

// Line 2: why it mattered — the cause and effect of that one decision.
const LINE_2 =
  "Its rent ate half your pay for two years, and the savings you never built are why you still cannot afford to quit the job you hate.";

const ENTRY_TEXT = `${LINE_1}\n${LINE_2}`;

const OUTPUT_PATH = "/output/entry.txt";

// The gate: UTF-8 text of 1-280 characters, not only whitespace,
// exactly two non-empty lines, each exactly one sentence.
function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  if (text.length > 280) {
    throw new Error(`entry text is ${text.length} characters, over the 280 limit`);
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry text must have exactly 2 lines, got ${lines.length}`);
  }
  for (const [i, line] of lines.entries()) {
    if (line.trim().length === 0) {
      throw new Error(`line ${i + 1} must not be empty`);
    }
    if (!isSingleSentence(line)) {
      throw new Error(`line ${i + 1} must be exactly one sentence`);
    }
  }
}

// A line is one sentence when it ends with a single terminal
// punctuation mark and contains no other sentence-ending mark.
function isSingleSentence(line: string): boolean {
  const trimmed = line.trim();
  if (!/[.!?]$/.test(trimmed)) return false;
  const body = trimmed.slice(0, -1);
  return !/[.!?]/.test(body);
}

function main(): void {
  validate(ENTRY_TEXT);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT + "\n", "utf8");
  console.log(`Wrote ${ENTRY_TEXT.length} characters to ${OUTPUT_PATH}`);
}

main();
