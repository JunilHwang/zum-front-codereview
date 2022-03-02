// 기본
export const setLocalItem = (key: string, value: string): void => localStorage.setItem(key, value);
export const getLocalItem = (key: string) => localStorage.getItem(key);
export const removeLocalItem = (key: string): void => localStorage.removeItem(key);
export const clearLocalStorage = (): void => localStorage.clear();

// ----

// 활용
export function getParseLocalItem<T>(key: string) {
  const strItem = getLocalItem(key);
  if (!strItem) return null;
  return JSON.parse(strItem) as T;
}
export function setConvertLocalItem(key: string, value: any): void {
  return setLocalItem(key, JSON.stringify(value));
}
export function addLocalItem(key: string, initValue: any) : void {
  if (getParseLocalItem(key)) return;
  setConvertLocalItem(key, initValue);
}
