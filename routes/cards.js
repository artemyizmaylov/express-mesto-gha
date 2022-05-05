const router = require('express').Router();

const {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { cardsPattern, idPattern } = require('../middlewares/validation');

router.use(auth);

router.route('/')
  .get(getCards)
  .post(cardsPattern, createCard);

router.delete('/:id', idPattern, removeCard);

router.route('/:id/likes')
  .put(idPattern, setLike)
  .delete(idPattern, removeLike);

module.exports = router;
