const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { signupPattern, signinPattern } = require('../middlewares/validation');

router.post('/signup', signupPattern, createUser);
router.post('/signin', signinPattern, login);
router.post('/signout', logout);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', () => {
  throw new NotFoundError('Некорректный путь запроса');
});

module.exports = router;
