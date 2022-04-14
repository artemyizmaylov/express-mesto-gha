const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const { NOT_FOUND, DEFAULT_ERROR } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.listen(PORT);

app.use(bodyParser.json());
// Обработка ошибки при некорректной передаче JSON в теле запроса
app.use((err, req, res, next) => {
  if (err) {
    res
      .status(DEFAULT_ERROR)
      .send({ message: 'Ошибка парсинга данных. Проверьте корректность JSON' });
  } else {
    next();
  }
});
// Хардкодим ID пользователя для связки с карточками
app.use((req, res, next) => {
  req.user = {
    _id: '6257ed77dfa8aa1aab5799f0',
  };

  next();
});
app.use(userRouter);
app.use(cardRouter);

app.use('/', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Некорректный путь запроса' });
});
