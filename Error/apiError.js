const BaseError = require("./baseError");

class APIError extends BaseError {
  constructor(name, httpStatusCode, message) {
    super(name,httpStatusCode,message);
  }
}
module.exports = APIError;
