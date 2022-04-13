const userModel = require("../models/user");

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  userModel
    .findById(userId)
    .then((user) => res.send({ user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
