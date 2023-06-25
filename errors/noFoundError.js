const { NOT_FOUND } = require('./errorsStatus');

class NoFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NoFoundError;
