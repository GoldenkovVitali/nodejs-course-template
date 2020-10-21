const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../src/common/config');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', async () => {
    console.log('DB connected!');
    await db.dropDatabase();
    cb();
  });
};

module.exports = { connectToDB };
