const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const errorHandler = require('./middlewares/errorHandler');
const rootRouter = require('./routes/index');
const config = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const NoFoundError = require('./errors/noFoundError');

const app = express();
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

dotenv.config();

// Подключаем middleware для обработки JSON в body запроса
app.use(express.json());

// Middleware для обработки cookies
app.use(cookieParser());

// Подключаем логгер запросов
app.use(requestLogger);

// Подключаем лимитер запросов
app.use(limiter);

// Подключаемся к серверу MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Подключаем корневой роутер
app.use(rootRouter);

// Middleware для обработки ошибок celebrate
app.use(errors());

// Middleware для обработки несуществующих маршрутов
app.use((req, res, next) => {
  next(new NoFoundError('Запрашиваемый ресурс не найден'));
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Middleware для обработки ошибок
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('Сервер запущен');
});
