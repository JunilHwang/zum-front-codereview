export const createQueryString = (object: { [key: string]: any }) => {
  return `?${Object.keys(object)
    .map((key) => `${key}=${object[key]}`)
    .join("&")}`;
};
