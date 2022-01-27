const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export function makeComponentId(length: number = 16): string {
  const [startCode, endCode] = ["a".charCodeAt(0), "z".charCodeAt(0)];
  let result = "";
  while (result.length < length) {
    const isInNum = Boolean(Math.round(Math.random()));
    if (isInNum) result += getRandomNumber(0, 9);
    else result += String.fromCharCode(getRandomNumber(startCode, endCode));
  }
  return `__${result}`;
}
