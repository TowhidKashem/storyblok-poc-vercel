export const objectToArray = (obj: any) =>
  Object.keys(obj).map((key) => obj[key]);
