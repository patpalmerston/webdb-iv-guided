// db is a configured instance of knex that know how to talk to the database
const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
 return db('tracks')
}

function findById(id) {
  return db('tracks')
    .where ({ id })
    .first()
}

function add(track) {
  // passing 'id' as the second Param is recommended to ensure the id is returned
  // when connecting to other DBMS like Postgres
  return db('tracks').insert(track, 'id')
}

function update(id, changes) {
  return db('tracks')
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db('tracks')
    .where({ id })
    .del();
}