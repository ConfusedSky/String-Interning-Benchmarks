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

const benchmark = (array) => {
  console.time("O(N)");
  console.log(getCount(array, "This is a test"));
  console.timeEnd("O(N)");

  console.time("O(N log(N))");
  array.sort();
  console.timeEnd("O(N log(N))");
};

module.exports = {
  displayMemory,
  getCount,
  benchmark,
};
