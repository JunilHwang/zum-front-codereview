const PORT = 4000;
const httpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const errMessages = {
  createNullMsg: (strType: string) => `[!] '${strType}' data is null`,
  okMsg: "OK",
  internalMsg: "[!] There is an error in the server.",
  invalidInputMsg: "[!] Invalid input.",
  badIndexMsg: "[!] Invalid index.",
  notFoundForIdxMsg: "[!] Data corresponding to the index could not be found.",
  unableCrawMsg: "[!] Unable to get crawled data."
};

export { PORT, httpStatus, errMessages };
