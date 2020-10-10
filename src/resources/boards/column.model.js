const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'TITLE', order = 'order' } = {}) {
    this.order = order;
    this.title = title;
    this.id = id;
  }
}

module.exports = Column;
