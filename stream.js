const fs = require("fs");
const { benchmark, displayMemory, mapValue } = require("./common");
let data = "";
let results = [];

console.time("Read File");
// Create a readable stream
const readerStream = fs.createReadStream("tmp.txt");

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
      results.push(mapValue(line, process.argv[2]));

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

  benchmark(results, process.argv[2] === "number" ? 0 : undefined);
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});

console.log("Program Ended");
