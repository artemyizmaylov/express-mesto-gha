const jwt = require('jsonwebtoken');
const Forbidden = require('../errors/Forbidden');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация');
  }

  let payload;

  try {
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};
