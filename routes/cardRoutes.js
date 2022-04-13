const router = require("express").Router();
const {
  getCards,
  createCard,
  removeCard,
} = require("../controllers/cardControllers");

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", removeCard);

module.exports = router;
