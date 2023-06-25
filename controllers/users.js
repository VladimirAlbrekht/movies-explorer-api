const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/token');

const ValidationError = require('../errors/validationError');
const NoFoundError = require('../errors/noFoundError');
const AuthError = require('../errors/authError');
const UserExistError = require('../errors/userExistError');

const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser.toJSON());
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new ValidationError('Некорректные данные при создании пользователя.'));
    }
    if (error.code === 11000) {
      return next(new UserExistError('Пользователь с таким email уже существует'));
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Неправильные почта или пароль'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AuthError('Неправильные почта или пароль'));
    }
    const token = generateToken({ _id: user._id });
    res.cookie('jwt', token);
    return res.cookie('jwt', token).send({ message: 'Авторизация прошла успешно' });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NoFoundError('Пользователь не найден'));
    } return res.json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  .then(user => user.save())
  .then(user => {
    if (!user) {
      return next(new NoFoundError('Пользователь не найден'))
    }
    console.log(user)
    return res.json(user)
  })
  .catch(error => {
    if (error instanceof ValidationError) {
      return next(new ValidationError('Ошибка валидации.'));
    }
    return next(error);
  });
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    return res.send({ message: 'Вы успешно вышли из аккаунта' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  updateUser,
  signOut,
};
