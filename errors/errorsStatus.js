const http2 = require('http2');

module.exports = {
  OK: http2.constants.HTTP_STATUS_OK,
  NOT_FOUND: http2.constants.HTTP_STATUS_NOT_FOUND,
  BAD_REQUEST: http2.constants.HTTP_STATUS_BAD_REQUEST,
  INTERNAL_SERVER_ERROR: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
  UNAUTHORIZED: http2.constants.HTTP_STATUS_UNAUTHORIZED,
  FORBIDDEN: http2.constants.HTTP_STATUS_FORBIDDEN,
  CONFLICT: http2.constants.HTTP_STATUS_CONFLICT,
};
