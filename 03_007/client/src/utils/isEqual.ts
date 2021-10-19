export const isObjectEqual = (x: object, y: object): boolean => {
  return JSON.stringify(x) === JSON.stringify(y);
};

// fixme: --downlevelIteration Option 사용하거나 다른 방법으로 처리하기
// Map, Set, ...others
// export const isOtherEqual = (
//   x: Set<any> | Map<any, any>,
//   y: Set<any> | Map<any, any>,
// ): boolean => {
//   return JSON.stringify([...x].sort()) === JSON.stringify([...y].sort());
// };
