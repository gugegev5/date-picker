'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/webpack-numbers.js');
} else {
  module.exports = require('./cjs/webpack-numbers.js');
}