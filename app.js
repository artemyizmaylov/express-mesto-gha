const process = require('process');
require('dotenv').config();

const { PORT = 4000 } = process.env;

const { errors } = require('celebrate');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes/routes');

const { errorLogger, expressLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const allowedCors = [
  'https://project.mesto.nomoredomains.xyz',
  'http://project.mesto.nomoredomains.xyz',
  'http://localhost:3000',
];

const app = express();
app.listen(PORT);

app.use(helmet()); // защита заголовков

app.use(rateLimit({ // защита от DDoS
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // количество запросов
}));

app.use(bodyParser.json()); // сборка json из запросов
app.use(cookieParser()); // сборка кук

app.use(expressLogger); // логгер запросов

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(router);

app.use(errorLogger); // логгер ошибок
app.use(errors()); // ошибки celebrate
app.use(errorsHandler); // центральная обработка ошибок
