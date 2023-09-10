const { checkToken } = require('../utils/token');

const AuthError = require('../errors/authError');

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthError('Токен отсутствует или некорректен'));
  }

  const checkResult = checkToken(token);

  if (!checkResult) {
    return next(new AuthError('Токен не верифицирован, авторизация не пройдена'));
  }

  req.user = { _id: checkResult._id };
  return next();
};

module.exports = { checkAuth };
