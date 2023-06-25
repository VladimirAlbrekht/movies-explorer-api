const { BAD_REQUEST } = require('./errorsStatus');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = ValidationError;
