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
const pageTopBarSource = fs.readFileSync(
  path.join(projectRoot, "src/components/common/PageTopBar.tsx"),
  "utf8",
);
const middlewareSource = fs.readFileSync(
  path.join(projectRoot, "src/middleware.ts"),
  "utf8",
);
const mockAuthStateSource = fs.readFileSync(
  path.join(projectRoot, "src/utils/auth/mockAuthState.ts"),
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

test("page top bar switches variants from middleware-backed state", () => {
  assert.match(pageTopBarSource, /getRequestLoginState/);
  assert.match(pageTopBarSource, /<TopBar isLoggedIn=\{isLoggedIn\} \/>/);
});

test("middleware stores the mocked auth state in a request header", () => {
  assert.match(mockAuthStateSource, /mock-auth-state/);
  assert.match(mockAuthStateSource, /x-is-logged-in/);
  assert.match(middlewareSource, /NextResponse\.next/);
});

test("translation file defines the public top bar label", () => {
  assert.match(translationsSource, /common:/);
  assert.match(translationsSource, /topBar:/);
  assert.match(translationsSource, /vendorLinkLabel: "ベンダーの方はこちら"/);
});
