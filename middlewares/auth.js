const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;
  try {
    const token = authorization.replace('Bearer ', '');
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
