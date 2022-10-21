class BaseError extends Error {
  constructor(name, httpStatusCode, message) {
    super(message);
    //set prototype of this class to any sub class of it
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = name;
    this.httpStatusCode = httpStatusCode;

    /*a formatted call stack is attached to obj including the line/frame where captureStackTrace was called.
    by Create .stack property on a target object */

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
