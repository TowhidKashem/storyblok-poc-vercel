export const getRandomArrayValues = (
  arr: any[],
  count: number,
  result: any[] = [],
  cache = new Set()
): any[] => {
  if (count === 0) return result;

  const index = Math.floor(Math.random() * arr.length);

  if (cache.has(index)) {
    return getRandomArrayValues(arr, count, result, cache);
  }

  result.push(arr[index]);
  cache.add(index);

  return getRandomArrayValues(arr, count - 1, result, cache);
};
