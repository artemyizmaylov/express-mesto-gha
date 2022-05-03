const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

const cardsPattern = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\/(www)?.*/),
  }),
};

router.get('/cards', getCards);
router.post('/cards', celebrate(cardsPattern), createCard);
router.delete('/cards/:cardId', removeCard);
router.put('/cards/:cardId/likes', setLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
