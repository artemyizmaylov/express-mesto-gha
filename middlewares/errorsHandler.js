const { BAD_REQ_CODE, CONFLICT_CODE, DEFAUTL_CODE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAUTL_CODE, message } = err;

  if (err.code === 11000) {
    res.status(CONFLICT_CODE).send({ message: 'Email уже зарегистрирован' });
  } else if (err.name === 'CastError') {
    res.status(BAD_REQ_CODE).send({ message: 'Неправильный ID' });
  } else if (err.name === 'ValidationError') {
    res.status(BAD_REQ_CODE).send({ message: 'Переданы некорректные или неполные данные' });
  } else {
    res.status(statusCode).send(statusCode === DEFAUTL_CODE
      ? { message: 'На сервере произошла ошибка' }
      : { message });
    next();
  }
};
