const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const userModel = require('../models/user');

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  userModel
    .findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch(next);
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
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel
        .create({
          name, about, avatar, email, password: hash,
        })
        .then((user) => {
          const newUser = Object.assign(user);
          delete newUser.password;
          res.send(newUser);
        })
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findUserByCreden(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' });

      res.cookie('jwt', token, { httpOnly: true }).send({ jwt: token });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};
