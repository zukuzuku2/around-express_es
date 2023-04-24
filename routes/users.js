const router = require('express').Router();
const {
  getUserController,
  getUserByIdController,
  postUserController,
  updateMeController,
  updateAvatarController,
} = require('../controllers/users');

router.get('/users', getUserController);
router.get('/users/:id', getUserByIdController);
router.post('/users', postUserController);
router.patch('/users/me', updateMeController);
router.patch('/users/me/avatar', updateAvatarController);

module.exports = router;
