const process = require('process');

const { PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsCheck = require('./middlewares/errorsCheck');

const NotFound = require('./errors/NotFound');

const signupPattern = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
};

const signinPattern = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const authPattern = {
  [Segments.HEADERS]: Joi.object().keys({
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
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.listen(PORT);
app.use(bodyParser.json());

app.post('/signup', celebrate(signupPattern), createUser);
app.post('/signin', celebrate(signinPattern), login);

app.use(auth, celebrate(authPattern));
app.use(userRouter);
app.use(cardRouter);

app.use('*', () => {
  throw new NotFound('Некорректный путь запроса');
});

// Обработка ошибок
app.use(errors());
app.use(errorsCheck);
