const REG_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const STATUS_ОК = 200;
const CREATED = 201;
const ERROR = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports = {
  REG_URL,
  STATUS_ОК,
  CREATED,
  ERROR,
  NOT_FOUND,
  SERVER_ERROR,
};
