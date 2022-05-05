const { Joi, celebrate } = require('celebrate');
const { LINK_REGEXP } = require('../utils/constants');

const signupPattern = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_REGEXP),
  }),
});

const signinPattern = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const cardsPattern = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(LINK_REGEXP),
  }),
});

const userPattern = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_REGEXP),
  }),
});

const idPattern = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
});

module.exports = {
  signupPattern, signinPattern, userPattern, cardsPattern, idPattern,
};
