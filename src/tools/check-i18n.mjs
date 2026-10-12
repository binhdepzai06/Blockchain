// Kiểm tra từ điển dịch: node tools/check-i18n.mjs   (hoặc: npm run i18n:check)
//  - Mọi tr("...") trong code phải có bản dịch trong src/i18n/en.ts
//  - Mọi chuỗi trong các bảng dữ liệu cố định (DATA_FILES) cũng phải có bản dịch
//  - Bản dịch phải giữ nguyên các tham số {0}, {1}...
//  - Cảnh báo bản dịch không còn được dùng
import ts from "typescript";
import fs from "fs";
import path from "path";

const SRC = path.resolve("src");
const VI = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;

// Các file có chuỗi tiếng Việt nằm trong bảng dữ liệu cố định (hiển thị bằng tr(giá_trị))
const DATA_FILES = [
  "pages/AttackSimulator/AttackParameters.tsx",
  "pages/AttackSimulator/AttackSimulator.tsx",
  "pages/smart-contract/SmartContractPage.tsx",
  "lib/consensus/comparison.ts",
  "data/quizTopics.ts",
  "simulation/attacks/attackTypes.ts",
];
const IGNORE = ["i18n/", "tests/", "pages/team/", "components/auth/AuthModal.tsx", "components/layout/Navbar.tsx", "simulation/attacks/attackExplainers.ts"];

const parse = (f) =>
  ts.createSourceFile(f, fs.readFileSync(f, "utf8"), ts.ScriptTarget.Latest, true, f.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);

// 1) Từ điển
const dict = new Map();
const dictFile = parse(path.join(SRC, "i18n/en.ts"));
const readDict = (n) => {
  if (ts.isPropertyAssignment(n) && (ts.isStringLiteral(n.name) || ts.isNoSubstitutionTemplateLiteral(n.name)) && ts.isStringLiteral(n.initializer)) dict.set(n.name.text, n.initializer.text);
  ts.forEachChild(n, readDict);
};
readDict(dictFile);

// 2) Khóa cần có
const required = new Map(); // key -> "file:line"
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(e.name)) scan(p);
  }
}
function scan(f) {
  const rel = path.relative(SRC, f).replace(/\\/g, "/");
  if (IGNORE.some((i) => rel.startsWith(i)) || /^data\/.*Questions\.ts$/.test(rel)) return;
  const sf = parse(f);
  const where = (n) => `${rel}:${sf.getLineAndCharacterOfPosition(n.getStart()).line + 1}`;
  const isData = DATA_FILES.includes(rel);
  const visit = (n) => {
    if (ts.isCallExpression(n) && n.expression.getText() === "tr" && n.arguments[0] && (ts.isStringLiteral(n.arguments[0]) || ts.isNoSubstitutionTemplateLiteral(n.arguments[0]))) {
      if (!required.has(n.arguments[0].text)) required.set(n.arguments[0].text, where(n));
    }
    if (isData && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && VI.test(n.text)) {
      let inType = false;
      for (let a = n.parent; a; a = a.parent) if (ts.isTypeNode(a)) inType = true;
      if (!inType && !(ts.isPropertyAssignment(n.parent) && n.parent.name === n) && !required.has(n.text)) required.set(n.text, where(n));
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
}
walk(SRC);

// 3) So sánh
const params = (s) => (s.match(/\{\d+\}/g) ?? []).sort().join(",");
const missing = [], badParams = [], empty = [];
for (const [key, where] of required) {
  const en = dict.get(key);
  if (en === undefined) missing.push(`${where}  ${JSON.stringify(key.slice(0, 70))}`);
  else if (en.trim() === "") empty.push(where);
  else if (params(en) !== params(key)) badParams.push(`${where}  ${JSON.stringify(key.slice(0, 50))}`);
}
const unused = [...dict.keys()].filter((k) => !required.has(k));

console.log(`Khóa trong code: ${required.size} | bản dịch: ${dict.size}`);
if (unused.length) console.log(`\nCảnh báo — ${unused.length} bản dịch không còn được dùng:\n  ` + unused.slice(0, 10).map((k) => JSON.stringify(k.slice(0, 60))).join("\n  "));
if (missing.length) console.log(`\nLỖI — thiếu ${missing.length} bản dịch:\n  ` + missing.join("\n  "));
if (badParams.length) console.log(`\nLỖI — sai tham số {n}:\n  ` + badParams.join("\n  "));
if (empty.length) console.log(`\nLỖI — bản dịch rỗng:\n  ` + empty.join("\n  "));
if (missing.length || badParams.length || empty.length) process.exit(1);
console.log("\nOK: không thiếu bản dịch nào.");
