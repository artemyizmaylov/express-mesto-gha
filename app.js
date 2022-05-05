const process = require('process');

const { PORT = 3000 } = process.env;

const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes/routes');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.listen(PORT);

app.use(helmet()); // защита заголовков
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // количество запросов
}));

app.use(bodyParser.json());
app.use(router);

app.use(errors()); // ошибки Joi
app.use(errorsHandler);
