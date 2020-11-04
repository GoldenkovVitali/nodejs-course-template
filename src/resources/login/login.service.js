const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { FORBIDDEN } = require('http-status-codes');

const usersRepo = require('../users/user.db.repository');

const { ErrorHandler } = require('../../common/error');
const {
  INCORRECT_LOGIN_OR_PASSWORD
} = require('../../common/constants').ERRORS;
const { JWT_SECRET_KEY } = require('../../common/config');

const connect = async user => {
  const gettedUser = await usersRepo.getOneByLogin(user);
  if (!gettedUser) {
    throw new ErrorHandler(FORBIDDEN, INCORRECT_LOGIN_OR_PASSWORD);
  }
  const isPasswordValide = await bcrypt.compare(
    user.password,
    gettedUser.password
  );
  if (!isPasswordValide) {
    throw new ErrorHandler(FORBIDDEN, INCORRECT_LOGIN_OR_PASSWORD);
  }
  const { id, login } = gettedUser;

  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

module.exports = { connect };
