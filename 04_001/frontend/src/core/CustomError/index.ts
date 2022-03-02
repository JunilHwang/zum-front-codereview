/**
 * [CustomError]
 */

type ErrorMessageName = "NOT_FOUND_TARGET" | "NOT_FOUND_ROUTER_INFO";
type ErrorMessageType = {
  [name in ErrorMessageName]: string;
};
const errorMessage: ErrorMessageType = {
  NOT_FOUND_TARGET: `지정하려는 타켓을 찾을 수 없습니다.`,
  NOT_FOUND_ROUTER_INFO: `페이지 정보를 담고 있는 RouterInfo를 불러올 수 없습니다.`,
};

class CustomError extends Error {
  constructor(public readonly msgType: ErrorMessageName, public readonly name: string = "") {
    super(errorMessage[msgType]);
  }
}

export default CustomError;
