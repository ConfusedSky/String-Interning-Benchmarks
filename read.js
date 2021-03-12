const { readFileSync } = require("fs");

const displayMemory = () => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};

const getCount = (array, str) => {
  return array.reduce((v, c) => v + (c === str ? 1 : 0), 0);
};

console.time("Read File");
const b = readFileSync("tmp.txt");
const s = b.toString();
const results = s.split("\n");
console.timeEnd("Read File");
displayMemory();
console.log(results.length);

console.time("O(N)");
console.log(getCount(results, "This is a test"));
console.timeEnd("O(N)");

console.time("O(N log(N))");
results.sort();
console.timeEnd("O(N log(N))");
