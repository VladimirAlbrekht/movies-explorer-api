const router = require('express').Router();

const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie, validateMovie } = require('../middlewares/validation');

// возвращает все сохранённые пользователем фильмы
router.get('/', getUserMovies);

// создаёт фильм
router.post('/', validateCreateMovie, createMovie);

// удаляет сохранённый фильм
router.delete('/:movieId', validateMovie, deleteMovie);

module.exports = router;
