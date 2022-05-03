module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.code === 11000) {
    res.status(409).send({ message: 'Email уже зарегистрирован' });
  }

  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Неправильный ID' });
  }

  res.status(statusCode).send({ message });
  next();
};
