const displayMemory = () => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};

const fs = require("fs");
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
      if (process.argv[2] === "intern") {
        if (line === "This is a test") {
          results.push("This is a test");
        } else if (line === "This was a test") {
          results.push("This was a test");
        } else if (line === "This will be a test") {
          results.push("This will be a test");
        } else if (line === "This is an extra test") {
          results.push("This is an extra test");
        } else {
          results.push(line);
        }
      } else {
        results.push(line);
      }

      start = end + 1;
      end = data.indexOf("\n", start);
    }

    data = data.substring(start);
  }
});

const getCount = (array, str) => {
  return array.reduce((v, c) => v + (c === str ? 1 : 0), 0);
};

readerStream.on("end", function () {
  results.push(data);
  console.log(results.length);
  displayMemory();
  console.timeEnd("Read File");

  console.time("O(N)");
  console.log(getCount(results, "This is a test"));
  console.timeEnd("O(N)");

  console.time("O(N log(N))");
  results.sort();
  console.timeEnd("O(N log(N))");
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});

console.log("Program Ended");
