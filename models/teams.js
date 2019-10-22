'use strict';

const Model = require('./model.js');

const schema = {
  name: { type: 'string', required: true },
  color: {
    type: 'string',
    required: true,
    lowercase: true,
    enum: ['red', 'blue', 'yellow', 'purple'],
  },
};

class Teams extends Model {
  constructor() {
    super(schema, 'teams');
  }
}

module.exports = Teams;
