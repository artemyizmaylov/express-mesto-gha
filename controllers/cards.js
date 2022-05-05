const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const cardModel = require('../models/card');

module.exports.getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  const { id } = req.params;
  cardModel
    .findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return card;
    })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new ForbiddenError('Чужие карточки удалять нельзя!');
      }
      cardModel
        .deleteOne({ _id: card._id })
        .then((isDeleted) => res.send(isDeleted));
    })
    .catch(next);
};

module.exports.setLike = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(id, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};
