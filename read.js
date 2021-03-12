const { readFileSync } = require("fs");
const { benchmark, displayMemory } = require("./common");

console.time("Read File");
const b = readFileSync("tmp.txt");
const s = b.toString();
const results = s.split("\n");
console.timeEnd("Read File");
displayMemory();
console.log(results.length);

benchmark(results);
