const { createLogger, format, transports } = require('winston');

const { handleError } = require('../common/error');
const path = require('path');

const infoPath = path.join(__dirname, '../../logs/logs-common.log');
const errorsPath = path.join(__dirname, '../../logs/logs-errors.log');

const configConsole = {
  format: format.combine(format.colorize(), format.cli()),
  transports: [new transports.Console()]
};

const configFile = {
  format: format.json(),
  transports: [
    new transports.File({
      level: 'info',
      filename: infoPath
    }),
    new transports.File({
      level: 'error',
      filename: errorsPath
    })
  ]
};

const getStringFromObject = obj => {
  const arr = Object.entries(obj);
  if (arr.length === 0) return null;
  return `{${arr
    .map(parameter => {
      const [key, value] = parameter;
      if (typeof value === 'object') {
        const str = JSON.stringify(value);
        return `${key}: ${str}`;
      }
      return `${key}: ${value}`;
    })
    .join(', ')}}`;
};

const getLogsFromRequest = req => {
  const { url, method, body, query } = req;

  const request = getStringFromObject(body);
  const params = getStringFromObject(query);

  const logToConsole = `incoming request:
  {
    url: ${url},
    method: ${method},
    body: ${request},
    query_params: ${params}
  }`;

  const logToFile = `{ url: ${url}, method: ${method}, body: ${request}, query_params: ${params} }`;

  return { logToConsole, logToFile };
};

const winstonConsole = createLogger(configConsole);
const winstonFile = createLogger(configFile);

/* eslint-disable-next-line no-unused-vars */
const incomingLogger = (req, res, next) => {
  const { logToConsole, logToFile } = getLogsFromRequest(req);

  winstonConsole.log('info', logToConsole);
  winstonFile.log('info', logToFile);
  next();
};

const processErrorLogger = (message, errorType) => {
  const time = new Date().toString();
  const errString = `${time} | ${errorType}: ${message}`;

  winstonConsole.log('error', errString);
  winstonFile.log('error', errString);
  return winstonFile;
};

/* eslint-disable-next-line no-unused-vars */
const errorLogger = (err, req, res, next) => {
  const { statusCode, message } = handleError(err, res);
  const level = statusCode >= 400 && statusCode < 500 ? 'warn' : 'error';

  const { logToFile } = getLogsFromRequest(req);

  const time = new Date().toString();
  const errString = `${time} | Error ${statusCode}: ${message}`;
  winstonConsole.log(level, errString);
  winstonFile.log(level, `${errString} | Request: ${logToFile}`);
};

module.exports = {
  configConsole,
  configFile,
  incomingLogger,
  processErrorLogger,
  errorLogger
};
