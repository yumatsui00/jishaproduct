import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const topBarSource = fs.readFileSync(
  path.join(projectRoot, "src/components/common/PublicTopBar.tsx"),
  "utf8",
);
const layoutSource = fs.readFileSync(
  path.join(projectRoot, "src/app/layout.tsx"),
  "utf8",
);
const translationsSource = fs.readFileSync(
  path.join(projectRoot, "assets/translations/jp.ts"),
  "utf8",
);

test("public top bar uses translation-backed vendor text", () => {
  assert.match(topBarSource, /translations\.common\.topBar/);
  assert.match(topBarSource, /vendorLinkLabel/);
  assert.doesNotMatch(topBarSource, />ベンダーの方はこちら</);
});

test("public top bar renders logo and expected navigation targets", () => {
  assert.match(topBarSource, /src="\/Logo\.png"/);
  assert.match(topBarSource, /<Link href="\/" className="shrink-0">/);
  assert.match(topBarSource, /<Link[\s\S]*href="\/vendor"/);
});

test("root layout mounts the public top bar globally", () => {
  assert.match(layoutSource, /import PublicTopBar from/);
  assert.match(layoutSource, /<PublicTopBar \/>/);
});

test("translation file defines the public top bar label", () => {
  assert.match(translationsSource, /common:/);
  assert.match(translationsSource, /topBar:/);
  assert.match(translationsSource, /vendorLinkLabel: "ベンダーの方はこちら"/);
});
