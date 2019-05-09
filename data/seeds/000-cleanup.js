
// ./seeds/000-cleanup.js
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex);
};
