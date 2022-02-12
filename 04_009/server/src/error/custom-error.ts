/**
 * custom error
 * @param {number} status - http status code
 * @param {string} errorMessage - error message for developer
 * @param {string} customMessage - custom error message  ex) joi
 * @param {string} developerMessage - for developer messag  ex) db
 * @return {CustomError} - custom error object
 */

interface IParams {
  status: number;
  errorMessage: string;
  customMessage?: string;
  developerMessage?: string;
}

class CustomError extends Error {
  status: number;

  errorMessage: string;

  customMessage?: string;

  developerMessage?: string;

  constructor({ status, errorMessage, customMessage, developerMessage }: IParams) {
    super(errorMessage);

    Error.captureStackTrace(this, this.constructor);

    this.status = status;
    this.errorMessage = errorMessage;
    this.customMessage = customMessage;
    this.developerMessage = developerMessage;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
