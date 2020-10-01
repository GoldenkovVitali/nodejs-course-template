const path = require('path');
const fs = require('fs');
const { program } = require('commander');
const { pipeline } = require('stream');
const { ModifyStream, encode, decode } = require('./modules/modify');
const {
  validatePath,
  validateParams,
  errorCatch
} = require('./modules/validate');

process.on('exit', code => {
  console.log(`Process exited with code ${code}`);
});

program
  .passCommandToAction(false)
  .storeOptionsAsProperties(false)
  .version('0.0.1');

program
  .option('-a, --action <string>', 'an action encode/decode')
  .option('-i, --input <string>', 'an input file')
  .option('-s, --shift <number>', 'a shift')
  .option('-o, --output <string>', 'an output file')
  .parse(process.argv);

const init = ({ shift, action, input, output }) => {
  try {
    const outputPath = output ? path.join(__dirname, output) : null;
    const inputPath = input ? path.join(__dirname, input) : null;

    validatePath(inputPath, outputPath);
    validateParams(shift, action);

    const modifyFn = action === 'encode' ? encode : decode;

    const letterTransform = new ModifyStream({ modifyFn, shift });

    const letterwrite = output
      ? fs.createWriteStream(outputPath, {
          highWaterMark: 32 * 1024,
          flags: 'a'
        })
      : process.stdout;

    const letterread = input
      ? fs.createReadStream(inputPath, { highWaterMark: 32 * 1024 })
      : process.stdin;

    pipeline(letterread, letterTransform, letterwrite, err => {
      if (err) {
        errorCatch('Pipeline', 13, err.message);
      }
      console.log('Done!');
    });
  } catch (err) {
    console.error(err.message);
  }
};

init(program.opts());
