const { BAD_REQ_CODE, CONFLICT_CODE, DEFAUTL_CODE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAUTL_CODE, message } = err;

  if (err.code === 11000) {
    res.status(CONFLICT_CODE).send({ message: 'Email уже зарегистрирован' });
  }

  if (err.name === 'CastError') {
    res.status(BAD_REQ_CODE).send({ message: 'Неправильный ID' });
  }

  res.status(statusCode).send(statusCode === DEFAUTL_CODE
    ? { message: 'На сервере произошла ошибка' }
    : { message });
  next();
};
