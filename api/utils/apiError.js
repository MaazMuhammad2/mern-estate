class ApiError extends Error {
  constructor(
    stauscode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.stauscode = stauscode;
    this.data = null;
    this.message = message;
    this.status = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

// export const errorHnadler = (statusCode, message) => {
//   const error = new Error();
//   error.statusCode = statusCode;
//   error.message = message;
//   return error;
// };
