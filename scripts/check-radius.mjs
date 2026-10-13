import fs from "node:fs";
import path from "node:path";

const TARGET_DIRS = ["app", "components", "features"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mjs"]);

// Detect any Tailwind rounded classes (e.g., rounded, rounded-sm, rounded-full, rounded-[2px])
const ROUNDED_REGEX = /\brounded(-[a-zA-Z0-9_\-[\]]+)?\b/;
const MARKER_REGEX = /radius-ok:\s*avatar/;

let errors = 0;
const allowedList = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (ROUNDED_REGEX.test(line)) {
      const prevLine = i > 0 ? lines[i - 1] : "";
      const isAllowed = MARKER_REGEX.test(line) || MARKER_REGEX.test(prevLine);

      const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
      const lineNum = i + 1;

      if (isAllowed) {
        allowedList.push({ file: relPath, line: lineNum, text: line.trim() });
      } else {
        errors++;
        console.error(`❌ [VIOLATION] ${relPath}:${lineNum}`);
        console.error(`     ${line.trim()}`);
      }
    }
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      checkFile(fullPath);
    }
  }
}

for (const dir of TARGET_DIRS) {
  walkDir(path.resolve(process.cwd(), dir));
}

console.log(`\n=== check:radius report ===`);
console.log(`Allowed exceptions skipped (${allowedList.length}):`);
for (const item of allowedList) {
  console.log(`  ✓ [ALLOWED] ${item.file}:${item.line}`);
  console.log(`      ${item.text}`);
}

if (allowedList.length !== 1 || !allowedList[0].file.includes("AboutHero.tsx")) {
  console.error(`\n❌ Failed: Expected only 1 allowed avatar exception (AboutHero.tsx), but found ${allowedList.length}.\n`);
  process.exit(1);
}

if (errors > 0) {
  console.error(`\n❌ Failed: Found ${errors} unapproved rounded token(s).\n`);
  process.exit(1);
} else {
  console.log(`\n✅ Passed: 0 unapproved rounded tokens found across ${TARGET_DIRS.join(", ")} (only portrait avatar allowed).\n`);
  process.exit(0);
}
