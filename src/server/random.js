"use strict";

function dice(from, to) {
  const rollCount = 3,
        size  = ((to - from) / rollCount),
        rolls = Array(rollCount).fill(size);

  return from + rolls.map((r) => Math.random() * size | 0)
    .reduce((prev, cur) => prev + cur, 0);
}

function sample(array, count) {
  const sample = Array(count || 1)
    .fill(Math.random() * array.length | 0)
    .map((i) => array[i]);

  return count === 1 ? sample[0] : sample;
}


if (__filename === process.argv[1]) {
  console.log(
    Array(10000)
      .fill(0)
      .map(() => dice(0, 25))
      .reduce((p, c) => { p[c] = (p[c] || 0) + 1; return p }, [])
      .map((c) => Array(c / 15 | 0).fill('=').join(''))
      .join("\n"));
}


module.exports = {
  dice:   dice,
  sample: sample
};
