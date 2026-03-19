import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const layoutSource = fs.readFileSync(
  path.join(projectRoot, "src/app/layout.tsx"),
  "utf8",
);
const homePageSource = fs.readFileSync(
  path.join(projectRoot, "src/app/page.tsx"),
  "utf8",
);
const vendorPageSource = fs.readFileSync(
  path.join(projectRoot, "src/app/vendor/page.tsx"),
  "utf8",
);
const appointmentPageSource = fs.readFileSync(
  path.join(projectRoot, "src/app/appointment/page.tsx"),
  "utf8",
);
const vendorLandingSource = fs.readFileSync(
  path.join(projectRoot, "src/components/vendor/VendorLandingPage.tsx"),
  "utf8",
);

test("root layout no longer mounts the shared top bar", () => {
  assert.doesNotMatch(layoutSource, /import TopBar from/);
  assert.doesNotMatch(layoutSource, /<TopBar /);
});

test("all app pages mount the shared page top bar", () => {
  assert.match(homePageSource, /import PageTopBar from/);
  assert.match(homePageSource, /<PageTopBar \/>/);
  assert.match(vendorPageSource, /import PageTopBar from/);
  assert.match(vendorPageSource, /<PageTopBar \/>/);
  assert.match(appointmentPageSource, /import PageTopBar from/);
  assert.match(appointmentPageSource, /<PageTopBar \/>/);
});

test("vendor landing page no longer renders a duplicate public top bar", () => {
  assert.doesNotMatch(vendorLandingSource, /import PublicTopBar from/);
  assert.doesNotMatch(vendorLandingSource, /<PublicTopBar \/>/);
});
