const cardModel = require("../models/card");

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;

module.exports.getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные или неполные данные" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так" });
      }
    });
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params;
  cardModel
    .remove({ _id: cardId })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      }
    });
};

module.exports.setLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(BAD_REQUEST).send({
            message: "Переданы некорректные или неполные данные",
          });
          break;
        case "CastError":
          res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
          break;
        default:
          res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так" });
      }
    });
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cardModel
    .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      switch (err.name) {
        case "ValidationError":
          res.status(BAD_REQUEST).send({
            message: "Переданы некорректные или неполные данные",
          });
          break;
        case "CastError":
          res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
          break;
        default:
          res.status(DEFAULT_ERROR).send({ message: "Что-то пошло не так" });
      }
    });
};
