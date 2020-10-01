const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE = UPPER_CASE.toLowerCase();
const { Transform } = require('stream');

class ModifyStream extends Transform {
  constructor(options) {
    super(options);
    this.modifyFn = options.modifyFn;
    this.shift = options.shift;
  }
  _transform(chunk, encoding, callback) {
    this.push(this.modifyFn(chunk.toString(), this.shift));
    callback();
  }
}

const modifySymbol = (symbol, direction, delta) => {
  const shift = +delta;
  let system;
  if (UPPER_CASE.includes(symbol)) system = UPPER_CASE;
  if (LOWER_CASE.includes(symbol)) system = LOWER_CASE;

  if (system && system.includes(symbol)) {
    const index = system.indexOf(symbol);
    const { length } = system;
    let newIndex;
    if (direction === 'decode') {
      newIndex = (index + shift) % length;
    } else {
      newIndex = (length + index - shift) % length;
    }
    return system[newIndex];
  }
  return symbol;
};

const modifyString = (str, direction, delta) => {
  return [...str]
    .map(symbol => modifySymbol(symbol, direction, delta))
    .join('');
};

const encodeString = (str, delta) => modifyString(str, 'encode', delta);
const decodeString = (str, delta) => modifyString(str, 'decode', delta);

module.exports = {
  encode: encodeString,
  decode: decodeString,
  ModifyStream
};
