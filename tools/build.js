#!/usr/bin/env node
/**
 * build.js: bundles the modular source into ONE self-contained HTML file.
 *
 * Reads the root index.html and replaces
 *   <link rel="stylesheet" href="X">  with  <style>...X...</style>
 *   <script src="X"></script>          with  <script>...X...</script>
 *   <link rel="icon" href="X.svg">     with  the same icon as a data: URI
 * in the order they appear. Nothing else is touched, so index.html stays the single
 * source of truth for load order.
 *
 * Usage:  node tools/build.js [outputPath]
 * Default output: greater-eurasia-plan.html in the project root. No npm install needed.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.resolve(process.argv[2] || path.join(root, "greater-eurasia-plan.html"));

function readSource(relativePath) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) throw new Error("Missing file referenced by index.html: " + relativePath);
  return fs.readFileSync(file, "utf8").replace(/\s+$/, "");
}

/** Guard: inlined JS or CSS must not contain a closing tag that would end the block early. */
function safeInline(text, kind, relativePath) {
  const closing = new RegExp("</" + kind, "i");
  if (closing.test(text)) throw new Error(relativePath + " contains </" + kind + ", which would break inlining");
  return text;
}

function build() {
  let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  let styles = 0, scripts = 0;
  html = html.replace(/<link rel="icon" href="([^"]+\.svg)" type="image\/svg\+xml">/g, (_, file) =>
    '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,' + encodeURIComponent(readSource(file)) + '">');
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, file) => {
    styles++;
    return "<style>\n" + safeInline(readSource(file), "style", file) + "\n</style>";
  });
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, file) => {
    scripts++;
    return "<script>\n/* ---- " + file + " ---- */\n" + safeInline(readSource(file), "script", file) + "\n</script>";
  });
  fs.writeFileSync(output, html);
  console.log("Built " + path.relative(process.cwd(), output) + " (" + styles + " stylesheet, " + scripts + " scripts, " + Math.round(html.length / 1024) + " KB)");
}

build();
