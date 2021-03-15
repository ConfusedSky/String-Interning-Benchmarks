const fs = require("fs");
const { benchmark, displayMemory, mapValue, getCount } = require("./common");
let data = "";
let results = [];

const [node, f, type, input] = process.argv;

console.time("Read File");
// Create a readable stream
const readerStream = fs.createReadStream(input || "tmp.txt");

// Set the encoding to be utf8.
readerStream.setEncoding("UTF8");

// Handle stream events --> data, end, and error
readerStream.on("data", function (chunk) {
  data += chunk;
  if (chunk.includes("\n")) {
    let start = 0;
    let end = data.indexOf("\n", start);

    while (end !== -1) {
      const line = data.substring(start, end);
      results.push(mapValue(line, type));

      start = end + 1;
      end = data.indexOf("\n", start);
    }

    data = data.substring(start);
  }
});

readerStream.on("end", function () {
  results.push(data);
  console.log(results.length);
  displayMemory();
  console.timeEnd("Read File");

  const value = type === "number" ? 0 : type === "float" ? 0.1 : undefined;

  benchmark(results, value);

  if (input === "tmp2.txt") {
    console.time("O(N^2)");
    results.map((v) => getCount(results, v));
    console.timeEnd("O(N^2)");
  }
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});

console.log("Program Ended");
