import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const vendorLandingSource = fs.readFileSync(
  path.join(projectRoot, "src/components/vendor/VendorLandingPage.tsx"),
  "utf8",
);
const vendorScrollButtonSource = fs.readFileSync(
  path.join(projectRoot, "src/components/vendor/VendorScrollButton.tsx"),
  "utf8",
);
const vendorDownloadFormSource = fs.readFileSync(
  path.join(projectRoot, "src/components/vendor/VendorDownloadForm.tsx"),
  "utf8",
);

test("service document buttons use the shared smooth scroll button", () => {
  assert.match(vendorLandingSource, /label=\{hero\.secondaryCta\}/);
  assert.match(vendorLandingSource, /label=\{finalCta\.secondaryCta\}/);
  assert.match(vendorLandingSource, /<VendorScrollButton/);
});

test("vendor scroll button uses smooth scrolling to the download form", () => {
  assert.match(vendorScrollButtonSource, /vendor-download-form-anchor/);
  assert.match(vendorScrollButtonSource, /behavior: "smooth"/);
  assert.match(vendorScrollButtonSource, /scrollIntoView/);
});

test("vendor form section exposes the scroll target and form id", () => {
  assert.match(vendorLandingSource, /id="vendor-download-form-anchor"/);
  assert.match(vendorDownloadFormSource, /id="vendor-download-form"/);
});
