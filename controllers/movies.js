const Movie = require('../models/movie');
const NoFoundError = require('../errors/noFoundError');
const NoRightsError = require('../errors/noRightsError');
const ValidationError = require('../errors/validationError');
const UserExistError = require('../errors/userExistError');

// возвращает все сохранённые пользователем фильмы
const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies.map((movie) => movie));
    })
    .catch(next);
};

// создаёт фильм с переданными в теле
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,

  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new UserExistError('Данный фильм уже сохранен в избранном'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NoFoundError('Фильм не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new NoRightsError('Недостаточно прав для удаления'));
      } return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: `Фильм  '${movie.nameRU}' удален из избранного` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
