require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { SERVER_ERROR } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch(() => console.log('Ошибка соединения с базой данных'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === SERVER_ERROR ? 'Ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log('Ура! Сервер запущен!');
});

// server {
//   listen 80;
//   server_name streitan.nomoreparties.sbs;
//   root /react-mesto-api-full-gha/frontend/build;
//   try_files $uri /index.html;
// }

// scp -r ./build/* streitan@84.201.172.240:/home/praktikum/mesto-frontend
