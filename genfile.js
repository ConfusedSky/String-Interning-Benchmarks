const fs = require("fs");
const { promises } = fs;

const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const writeLine = async (line) => {
  await promises.appendFile("tmp2.txt", line + "\n");
};

const strings = [
  "This is a test",
  "This was a test",
  "This will be a test",
  "This is an extra test",
];

const main = async () => {
  for (let i = 0; i < 1e5; i++) {
    const s = randomInt(strings.length);
    await writeLine(strings[s]);
  }
};

main()
  .then(() => console.log("Success"))
  .catch((e) => console.error(e));
