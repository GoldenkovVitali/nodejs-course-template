const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};
