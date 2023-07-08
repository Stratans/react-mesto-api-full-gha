const card = require('../models/card');
const NotFoundError = require('../errors/notFound');
const ValidationError = require('../errors/validationError');
const ForbiddenError = require('../errors/forbiddenError');

const {
  CREATED,
  STATUS_ОК,
} = require('../utils/constants');

// ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК
module.exports.getCards = (req, res, next) => {
  card.find({})
    .populate(['owner', 'likes'])
    .then((cardData) => res.status(STATUS_ОК).send(cardData))
    .catch(next);
};

// СОЗДАНИЕ КАРТОЧКИ
module.exports.createCard = ((req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return card.create({ name, link, owner })
    .then((cardData) => cardData.populate('owner')
      .then(() => { res.status(CREATED).send(cardData); }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Приехали! Некорректные данные!'));
      } else {
        next(err);
      }
    });
});

// УДАЛЕНИЕ КАРТОЧКИ ПО АЙДИ
module.exports.deleteCard = ((req, res, next) => {
  const userId = req.user._id;
  const removeCard = () => {
    card.findByIdAndRemove(req.params._id)
      .then((cardData) => {
        res.send({ data: cardData });
      })
      .catch(next);
  };
  card.findById(req.params._id)
    .then((cardData) => {
      if (!cardData) {
        throw new NotFoundError('Приехали! Пользователь не найден!');
      }
      if (cardData.owner.toString() !== userId) {
        throw new ForbiddenError('Приехали! Не имеете права удалять чужую карточку!');
      }
      return removeCard();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Приехали! Некорректное айди!'));
      } else next(err);
    });
});

// СТАВИМ ЛАЙК КАРТОЧКЕ
module.exports.likeCard = ((req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((cardData) => {
      if (!cardData) {
        throw new NotFoundError('Приехали! Карточка не найдена!');
      }
      res.send(cardData);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Приехали! Некорректное айди!'));
      } else next(err);
    });
});

// СТАВИМ ДИЗЛАЙК КАРТОЧКЕ
module.exports.dislikeCard = ((req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((cardData) => {
      if (!cardData) {
        throw new NotFoundError('Приехали! Карточка не найдена!');
      }
      res.send(cardData);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Приехали! Некорректное айди!'));
      } else next(err);
    });
});
