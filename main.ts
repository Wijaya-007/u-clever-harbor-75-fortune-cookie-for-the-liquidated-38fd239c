// Fortune Cookie for the Liquidated Trader — one line, at most 20 words.
// A real fortune-cookie line that turns the knife gently: it promises the
// next trade will be the best one, then admits the cookie's evidence is
// exactly as solid as the trader's was.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Your next trade will be your best one. The cookie has no data to support this, but neither did you.";

// Gate: a single fortune-cookie message, at most 20 words of plain text.
const words = LINE.trim().split(/\s+/);
if (words.length < 1 || words.length > 20) {
  throw new Error(`line is ${words.length} words, must be 1-20`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("line must not have leading/trailing whitespace or double spaces");
}

const outDir = "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Verify the written bytes round-trip exactly.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("written entry does not match the line");
}
console.log(`wrote ${outPath} (${words.length} words)`);
console.log(LINE);
