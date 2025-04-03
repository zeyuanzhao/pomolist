export const arrayToMap = (arr: any[], key: string) => {
  const map = new Map();
  arr.forEach((item) => {
    if (item[key]) {
      map.set(item[key], item);
    }
  });
  return map;
};
