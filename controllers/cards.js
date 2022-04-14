const cardModel = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные или неполные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params;
  cardModel
    .findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Передан некорректный ID карточки' });
      }
    });
};

module.exports.setLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          res.status(BAD_REQUEST).send({
            message: 'Переданы некорректные или неполные данные',
          });
          break;
        case 'CastError':
          res
            .status(BAD_REQUEST)
            .send({ message: 'Передан некорректный ID карточки' });
          break;
        default:
          res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          res.status(BAD_REQUEST).send({
            message: 'Переданы некорректные или неполные данные',
          });
          break;
        case 'CastError':
          res
            .status(BAD_REQUEST)
            .send({ message: 'Передан некорректный ID карточки' });
          break;
        default:
          res.status(DEFAULT_ERROR).send({ message: 'Что-то пошло не так' });
      }
    });
};
