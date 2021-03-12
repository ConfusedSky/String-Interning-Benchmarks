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

const mapValue = (value, type) => {
  if (type === "intern") {
    if (value === "This is a test") {
      return "This is a test";
    } else if (value === "This was a test") {
      return "This was a test";
    } else if (value === "This will be a test") {
      return "This will be a test";
    } else if (value === "This is an extra test") {
      return "This is an extra test";
    } else {
      return value;
    }
  } else if (type === "number") {
    if (value === "This is a test") {
      return 0;
    } else if (value === "This was a test") {
      return 1;
    } else if (value === "This will be a test") {
      return 2;
    } else if (value === "This is an extra test") {
      return 3;
    } else {
      return -1;
    }
  } else {
    return value;
  }
};

const benchmark = (array, value = "This is a test") => {
  console.time("O(N)");
  console.log(getCount(array, value));
  console.timeEnd("O(N)");

  console.time("O(N log(N))");
  array.sort();
  console.timeEnd("O(N log(N))");
};

module.exports = {
  displayMemory,
  getCount,
  benchmark,
  mapValue,
};
