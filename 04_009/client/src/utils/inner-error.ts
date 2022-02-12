class Innererror extends Error {
  errorMessage: string;
  constructor(errorMessage: string) {
    super(errorMessage);

    Error.captureStackTrace(this, this.constructor);

    this.errorMessage = errorMessage;
  }
}

export default Innererror;
