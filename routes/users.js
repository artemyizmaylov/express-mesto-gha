const router = require('express').Router();

const {
  getUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userPattern, idPattern } = require('../middlewares/validation');

router.use(auth);

router.get('/', getUsers);

router.route('/me')
  .get(getCurrentUser)
  .patch(userPattern, updateUserInfo);

router.get('/:_id', idPattern, getUser);
router.patch('/me/avatar', userPattern, updateUserAvatar);

module.exports = router;
