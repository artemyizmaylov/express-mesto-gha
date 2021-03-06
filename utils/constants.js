const LINK_REGEXP = /^https?:\/\/(www\.)?[-\w]*\.[\w]{2,3}.*$/i;

const BAD_REQ_CODE = 400;
const UNAUTH_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const DEFAUTL_CODE = 500;

module.exports = {
  LINK_REGEXP,
  BAD_REQ_CODE,
  UNAUTH_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  DEFAUTL_CODE,
  CONFLICT_CODE,
};
