#!/usr/bin/env node
/**
 * check-data.js: sanity-checks the data files without a browser.
 *
 * Loads shared.js, every data file (in the order listed in index.html) and model.js
 * inside a sandbox with no DOM, then runs GEP.model.validate(): unknown arcs, branches or
 * statuses, missing "from"/"to" stops, unparseable stop strings, branches without stages.
 *
 * Usage:  node tools/check-data.js     (exit code 1 when problems are found)
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1])
  .filter(f => f.startsWith("src/data/") || f === "src/js/shared.js" || f === "src/js/model.js");

const sandbox = {console};
vm.createContext(sandbox);
files.forEach(file => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, {filename: file}));

const GEP = vm.runInContext("GEP", sandbox);
const problems = GEP.model.validate();
const {stages, arcs, branches, tabs} = GEP.data;

Object.keys(tabs).forEach(tabId => {
  const list = GEP.model.stagesOfTab(tabId);
  const names = new Set();
  list.forEach(s => s.pts.forEach(p => names.add(p.name)));
  const count = status => list.filter(s => s.status === status).length;
  console.log(tabId.padEnd(9) + list.length + " stages, " + names.size + " stops, " + GEP.model.arcIds(tabId).length + " arcs, " +
    GEP.model.arcIds(tabId).reduce((n, a) => n + GEP.model.branchIds(a).length, 0) + " branches" +
    " (next " + count("next") + ", check " + count("check") + ", done " + count("done") + ")");
});

if (problems.length) {
  console.error("\n" + problems.length + " problem(s):\n - " + problems.join("\n - "));
  process.exit(1);
}
console.log("\nData OK: " + stages.length + " stages, " + Object.keys(arcs).length + " arcs, " + Object.keys(branches).length + " branches.");
