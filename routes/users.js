const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUser);

router.patch('/users/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

module.exports = router;
