const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { checkAuth } = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login, signOut } = require('../controllers/users');

// Открытые маршруты
router.post('/api/signup', validateSignup, createUser);
router.post('/api/signin', validateSignin, login);
router.use(checkAuth);

// Маршрут для выхода пользователя
router.post('/api/signout', signOut);

// Роутеры, требующие авторизации
router.use('/api/users', usersRouter);
router.use('/api/movies', moviesRouter);

module.exports = router;
