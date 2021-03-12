const { readFileSync } = require("fs");
const { benchmark, displayMemory, mapValue } = require("./common");

console.time("Read File");
const b = readFileSync("tmp.txt");
const s = b.toString();
const results = s.split("\n");
console.timeEnd("Read File");
displayMemory();
console.log(results.length);

console.time("Non-interned");
benchmark(results);
console.timeEnd("Non-interned");

console.log();

console.time("Map + Intern");
benchmark(results.map((v) => mapValue(v, "intern")));
console.timeEnd("Map + Intern");
