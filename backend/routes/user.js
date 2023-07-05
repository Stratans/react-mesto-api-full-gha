const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REG_URL } = require('../utils/constants');

const {
  getUsers,
  getUserInfo,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REG_URL),
  }),
}), updateAvatar);

module.exports = router;
