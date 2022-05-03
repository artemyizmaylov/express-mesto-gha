const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const userPattern = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(www)?.*/),
  }),
};

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUser);

router.patch('/users/me', celebrate(userPattern), updateUserInfo);
router.patch('/users/me/avatar', celebrate(userPattern), updateUserAvatar);

module.exports = router;
