const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const userModel = require('../models/user');
const Unauthorized = require('../errors/Unauthorized');

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  userModel
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    throw new BadRequest('Некорректный email');
  }

  bcrypt.hash(password, 10).then((hash) => {
    userModel
      .create({
        name, about, avatar, email, password: hash,
      })
      .then((user) => res.send(user))
      .catch((err) => {
        next(err);
      });
  });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  userModel
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль');
          }

          const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' });
          res.cookie('jwt', token, { httpOnly: true }).end();
        });
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
