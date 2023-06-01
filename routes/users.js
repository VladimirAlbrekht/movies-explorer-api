const router = require('express').Router();

const {
  validateUserProfile,
} = require('../middlewares/validation');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// защищенные маршруты
router.get('/me', getCurrentUser);
router.patch('/me', validateUserProfile, updateUser);

module.exports = router;
