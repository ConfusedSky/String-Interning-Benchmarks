const { readFileSync } = require("fs");

const displayMemory = () => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};

const b = readFileSync("tmp.txt");
displayMemory();
const s = b.toString();
displayMemory();
const strings = s.split("\n");
displayMemory();
console.log(strings.length);
