const { BAD_REQ_CODE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQ_CODE;
  }
}

module.exports = BadRequestError;
