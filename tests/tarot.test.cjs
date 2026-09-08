const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const box = { exports: {}, crypto: require("node:crypto").webcrypto };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, "../src/lib/tarot.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, box);
const { tarotCards, parseDailyCard, localDay, drawTarotIds } = box.exports;
assert.equal(tarotCards.length, 78);
assert.equal(new Set(tarotCards.map(c => c.name)).size, 78);
for (const card of tarotCards) {
  assert(card.meaning && card.attention && card.advice);
  assert.equal(card.palette.length, 3);
  card.palette.forEach(hex => assert.match(hex, /^#[0-9A-F]{6}$/));
  assert.equal(parseDailyCard(JSON.stringify({version:1, day:"2026-09-08", id:card.id}), "2026-09-08"), card.id);
}
for (const value of [null, "bad", "{}", JSON.stringify({version:1,day:"2026-09-07",id:0}), JSON.stringify({version:1,day:"2026-09-08",id:78}), JSON.stringify({version:1,day:"2026-09-08",id:-1}), JSON.stringify({version:1,day:"2026-09-08",id:"1"})]) {
  assert.equal(parseDailyCard(value, "2026-09-08"), null);
}
assert.equal(localDay(new Date(2026, 8, 8, 0, 1)), "2026-09-08");
assert.equal(localDay(new Date(2026, 11, 31, 23, 59)), "2026-12-31");
assert.equal(localDay(new Date(2027, 0, 1, 0, 1)), "2027-01-01");
for(let i=0;i<1000;i++) {const draw=drawTarotIds(3); assert.equal(draw.length,3);assert.equal(new Set(draw).size,3);draw.forEach(id=>assert(id>=0&&id<78));}
assert.equal(new Set(drawTarotIds(78)).size,78);
for(const count of [0,-1,79,1.5])assert.throws(()=>drawTarotIds(count));
console.log("PASS: 78 cards, stored cards, malformed data, dates and 1000 unique spreads");
