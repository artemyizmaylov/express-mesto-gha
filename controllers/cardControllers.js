const cardModel = require("../models/card");

module.exports.getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((data) => res.send({ data }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка", err }));
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params;
  cardModel
    .remove({ _id: cardId })
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
