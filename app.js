const process = require('process');

const { PORT = 3000 } = process.env;

const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes/routes');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.listen(PORT);

app.use(bodyParser.json());
app.use(router);

// Обработка ошибок
app.use(errors());
app.use(errorsHandler);
