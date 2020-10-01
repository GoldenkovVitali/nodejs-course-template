/* eslint-disable no-sync */
const fs = require('fs');

const errorCatch = (typeMessage, innerCode, inputMessage) => {
  process.exitCode = innerCode;
  throw new Error(`${typeMessage}! ${inputMessage}`);
};

const isCyrillic = text => {
  return /[а-я]/i.test(text);
};

const validateParams = (shift, action) => {
  if (!action) {
    errorCatch('Required', 3, 'Please, write action parameter');
  }
  if (isCyrillic(action)) {
    errorCatch('Required', 11, 'Please, write action parameter in inlish');
  }

  if (!shift) {
    errorCatch('Required', 4, 'Please, write shift parameter');
  }

  if (action !== 'encode' && action !== 'decode') {
    errorCatch(
      'Invalid parameter',
      6,
      'Please, write encode/decode for action parameter'
    );
  }
  if (typeof +shift !== 'number') {
    errorCatch('Invalid type', 5, 'Please, write Number for shift parameter');
  }
};
const validatePath = (inputPath, outputPath) => {
  try {
    fs.accessSync(inputPath, fs.constants.R_OK);
    fs.accessSync(inputPath, fs.constants.F_OK);
  } catch (err) {
    if (err.code === 'EPERM') {
      errorCatch('Input file is not readable', 8, inputPath);
    }
    if (err.code === 'ENOENT') {
      errorCatch('Input file is not exist', 7, inputPath);
    }
  }

  try {
    fs.accessSync(outputPath, fs.constants.F_OK);
    fs.accessSync(outputPath, fs.constants.W_OK);
  } catch (err) {
    if (err.code === 'ENOENT') {
      errorCatch('Output file is not exist', 9, outputPath);
    }
    if (err.code === 'EPERM') {
      errorCatch('Input file is not writable', 10, outputPath);
    }
  }
};

module.exports = { validatePath, validateParams, errorCatch };
