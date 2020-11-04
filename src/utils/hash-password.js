const { SALT_ROUNDS } = require('../common/constants');
const bcrypt = require('bcrypt');

const hashPassword = async ({ password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

module.exports = hashPassword;
