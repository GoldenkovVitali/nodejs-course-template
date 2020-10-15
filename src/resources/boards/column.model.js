const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'TITLE', order = 'order' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
