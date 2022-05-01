const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.listen(PORT);

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth, celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
    cookie: Joi.string(),
    accept: Joi.string(),
    host: Joi.string(),
    connection: Joi.string(),
    'content-type': Joi.string(),
    'user-agent': Joi.string(),
    'accept-encoding': Joi.string(),
    'content-length': Joi.string(),
  }),
}));

app.use(errors());

app.use(userRouter);
app.use(cardRouter);

app.use('*', () => {
  throw new NotFound('Некорректный путь запроса');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  switch (err.name) {
    case 'CastError':
      res.status(400).send({ message: 'Неправильный ID' });
      break;
    case 'ValidationError':
      res.status(400).send({ message: 'Переданы некорректные или неполные данные' });
      break;
    case 'MongoServerError':
      res.status(400).send({ message: 'Данный email уже зарегистрирован' });
      break;
    default:
      res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
      break;
  }

  next();
});
