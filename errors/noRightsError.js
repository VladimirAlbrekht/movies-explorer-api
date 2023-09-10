const { FORBIDDEN } = require('./errorsStatus');

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = NoRightsError;
