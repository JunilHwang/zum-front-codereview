const setLocalItem = (key: string, value: string) => localStorage.setItem(key, value);
const getLocalItem = (key: string) => localStorage.getItem(key);
const removeLocalItem = (key: string) => localStorage.removeItem(key);
const clearLocalStorage = () => localStorage.clear();
const getParseLocalItem = (key: string) => {
  const strItem = getLocalItem(key);
  if (!strItem) return null;
  return JSON.parse(strItem);
};
const setConvertLocalItem = (key: string, value: any) => setLocalItem(key, JSON.stringify(value));
const addLocalItem = (key: string, initValue: any) => {
  if (getParseLocalItem(key)) return;
  setConvertLocalItem(key, initValue);
};

export { setLocalItem, getLocalItem, removeLocalItem, clearLocalStorage, getParseLocalItem, setConvertLocalItem, addLocalItem };
