const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../errors/notFound');
const CastError = require('../errors/castError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  CREATED,
  STATUS_ОК,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((userData) => res.status(STATUS_ОК).send({ data: userData }))
    .catch(next);
};

// ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
module.exports.createUser = ((req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    })
      .then((userData) => {
        const { _id } = userData;
        res.status(CREATED).send({
          data: {
            _id, email, name, about, avatar,
          },
        });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Приехали! Некорректные данные!'));
      } else if (err.code === 11000) {
        next(new ConflictError('Приехали! Пользователь уже существует!'));
      } else {
        next(err);
      }
    });
});

// ПОЛУЧЕНИЕ АЙДИ ПОЛЬЗОВАТЕЛЯ
module.exports.getUserById = ((req, res, next) => {
  user.findById(req.params._id)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Приехали! Пользователь не найден!');
      }
      res.status(STATUS_ОК).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Приехали! Некорректное айди!'));
      } else next(err);
    });
});

// ОБНОВЛЕНИЕ ПРОФИЛЯ
module.exports.updateProfile = ((req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  user.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Приехали! Пользователь не найден!');
      }
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Приехали! Некорректные данные!'));
      } else next(err);
    });
});

// ОБНОВЛЕНИЕ АВАТАРА
module.exports.updateAvatar = ((req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  user.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Приехали! Пользователь не найден!');
      }
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Приехали! Некорректные данные!'));
      } else next(err);
    });
});

// ЛОГИН
module.exports.login = ((req, res, next) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((userData) => {
      if (userData) {
        const token = jwt.sign({ _id: userData._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      }
    })
    .catch(next);
});

// ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
module.exports.getUserInfo = ((req, res, next) => {
  user.findById(req.user._id)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Приехали! Пользователь не найден!');
      }
      res.send(userData);
    })
    .catch(next);
});
