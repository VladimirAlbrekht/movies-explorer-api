require('dotenv').config();
const JWT = require('jsonwebtoken');

const { sign, verify } = JWT;

const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
const AuthError = require('../errors/authError');

function generateToken(payload) {
  return sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return new AuthError('Неправильный токен');
  }
  try {
    return verify(token, JWT_SECRET);
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = { generateToken, checkToken };
