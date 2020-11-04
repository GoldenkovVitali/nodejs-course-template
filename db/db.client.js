const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../src/common/config');
const { postUser } = require('../src/resources/users/user.service');

const MOCK_USER = { login: 'admin', password: 'admin' };

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', async () => {
    console.log('DB connected!');
    await postUser(MOCK_USER);
    cb();
  });
};

module.exports = { connectToDB };
