const { processErrorLogger } = require('./logger/logger');

process
  .on('unhandledRejection', err => {
    processErrorLogger(err.message, 'Unhandled Rejection');
  })
  .on('uncaughtException', err => {
    const logger = processErrorLogger(err.message, 'Uncaught Exception');
    const { exit } = process;
    logger.on('finish', () => exit(1));
  });

const { PORT } = require('./common/config');
const { connectToDB } = require('../db/db.client');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
