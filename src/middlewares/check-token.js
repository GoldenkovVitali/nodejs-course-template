const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../common/error');
const { JWT_SECRET_KEY } = require('../common/config');

const PATH_WITHOUT_AUTH = ['/', '/login', '/login/', '/doc', '/doc/'];

const checkToken = (req, res, next) => {
  const { url, headers } = req;
  if (PATH_WITHOUT_AUTH.includes(url)) {
    return next();
  }
  try {
    const token = headers.authorization.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch {
    throw new ErrorHandler(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
  }
};

module.exports = checkToken;
