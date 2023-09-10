const { UNAUTHORIZED } = require('./errorsStatus');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthError;
