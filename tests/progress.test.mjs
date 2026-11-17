// Zero-dependency test for carryProgress() in index.html.
// Run: node tests/progress.test.mjs
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const src = html.match(/function carryProgress\([\s\S]*?\n}\n/);
assert.ok(src, "carryProgress() not found in index.html");
const carryProgress = new Function(src[0] + "; return carryProgress;")();
// Fail fast if the regex extraction didn't yield the 3-argument function.
// (The must-fire cases below are what catch a wrong body.)
assert.equal(typeof carryProgress, "function", "extracted carryProgress is not a function");
assert.equal(carryProgress.length, 3, "extracted carryProgress has the wrong arity");

let failed = 0;
function test(name, fn) {
  try { fn(); console.log("ok   - " + name); }
  catch (e) { failed++; console.log("FAIL - " + name + "\n       " + e.message.split("\n").join("\n       ")); }
}

const oldList = [["A", "One"], ["B", "Two"], ["C", "Three"], ["D", "Four"], ["E", "Five"]];

// Must fire: a different list regenerated under the same name (the default
// "Playlist") must not inherit the old list's index-based done marks.
test("unrelated new list under same name starts with no progress", () => {
  const out = carryProgress(oldList, { 0: true, 1: true, 2: true }, [["X", "New One"], ["Y", "New Two"]]);
  assert.deepEqual(out, {});
});

test("edited list keeps done marks on the same tracks, not the same indices", () => {
  const edited = [["Z", "Inserted"], ["A", "One"], ["C", "Three"], ["F", "Six"]];
  const out = carryProgress(oldList, { 0: true, 2: true }, edited);
  assert.deepEqual(out, { 1: true, 2: true });
});

// Must not fire: reopening the same list keeps progress exactly as saved.
test("same list keeps saved progress unchanged", () => {
  const saved = { 0: true, 3: true };
  const out = carryProgress(oldList, saved, oldList.map(t => t.slice()));
  assert.deepEqual(out, { 0: true, 3: true });
});

// Must fire: with no stored tracklist (legacy data, a failed write) the marks
// can't be tied to any track, so they must not land on the new list by index.
test("no stored tracklist drops unverifiable marks", () => {
  assert.deepEqual(carryProgress(null, { 1: true, 4: true }, oldList), {});
});

// Must fire: a non-array value under the tracks key (the X / X-tracks name
// collision stores a progress object there) is treated as no tracklist.
test("non-array stored tracklist drops unverifiable marks", () => {
  assert.deepEqual(carryProgress({ 0: true }, { 0: true, 1: true }, oldList), {});
});

// Must not fire: a first-ever generate with nothing stored starts empty.
test("first generate with nothing stored starts empty", () => {
  assert.deepEqual(carryProgress(null, {}, oldList), {});
});

if (failed) { console.log(`\n${failed} test(s) failed`); process.exit(1); }
console.log("\nall tests passed");
