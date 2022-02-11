export const truncate = (input: string, num: number): string => {
  if (!input) return null;
  if (input.length > num) {
    return input.substring(0, num) + '...';
  } else {
    return input;
  }
};
