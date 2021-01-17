'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/datepicker.js');
} else {
  module.exports = require('./cjs/datepicker.js');
}