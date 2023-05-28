import * as THREE from "three";

export const freqSlice = (array, from, range, threshold) => {
  const slice = array.slice(from, from + 1 + range);
  if (slice.length === 0) {
    return 0;
  }
  const sum = slice.reduce((acc, val) => acc + val, 0);
  const avg = sum / slice.length;
  return avg / 256;
};

export const animate = (ref, value, interval = 0.15) => {
  ref = THREE.MathUtils.lerp(ref, value, interval);
};

export const findLargestDelta = (numbers) => {
  let largestDelta = 0;

  for (let i = 1; i < numbers.length; i++) {
    const delta = Math.abs(numbers[i] - numbers[i - 1]);

    if (delta > largestDelta) {
      largestDelta = delta;
    }
  }

  return largestDelta;
};
