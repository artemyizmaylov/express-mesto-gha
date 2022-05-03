const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const cardModel = require('../models/card');

module.exports.getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;
  cardModel
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      return card;
    })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new Forbidden('Чужие карточки удалять нельзя!');
      }
      cardModel
        .deleteOne({ _id: card._id })
        .then((isDeleted) => res.send(isDeleted));
    })
    .catch((err) => next(err));
};

module.exports.setLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => next(err));
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => next(err));
};
