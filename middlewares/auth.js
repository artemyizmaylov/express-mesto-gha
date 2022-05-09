const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret',
    );
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};
