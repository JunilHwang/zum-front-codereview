export function pipe<T>(...funcs: Function[]) {
  return (data: T) => funcs.reduce((currData, func) => func(currData), data);
}