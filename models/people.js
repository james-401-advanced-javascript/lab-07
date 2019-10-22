'use strict';

const Model = require('./model.js');

const schema = {
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  team: { type: 'string', required: false },
  birthday: { type: 'date', required: true },
  likes: {
    type: 'string',
    required: true,
    lowercase: true,
    enum: ['cats', 'dogs', 'none', 'both'],
  },
};

//   properties: {
//     firstName: { type: 'string', required: true },
//     lastName: { type: 'string', required: true },
//     team: { type: 'string', required: false },
//     birthday: { type: 'date', required: true },
//     likes: {
//       type: 'string',
//       required: true,
//       lowercase: true,
//       enum: ['cats', 'dogs', 'none', 'both'],
//     },
//   },
// };

class People extends Model {
  constructor(file) {
    super(schema, 'people');
  }
}

module.exports = People;
