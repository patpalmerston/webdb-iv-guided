
exports.up = function(knex, Promise) {
  // the tables must be created in the right order
  //table with a foriegn key created after the referenced parent table
  // can create more than one table in a file
  return knex.schema
    .createTable('tracks', tbl => {
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique()
    })// chaining tables together
    .createTable('cohorts', tbl => {
      tbl.increments();

      tbl.string('name', 128)
      .notNullable()
      .unique()

      tbl
        .integer('track_id')
          .unsigned()
          .references('id')
          .inTable('tracks')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
    })
    .createTable('students', tbl => {
      tbl.increments()

      tbl.string('name', 128)
      .notNullable()
    })
    .createTable('cohort_students', tbl => {
      // the students and the cohorts tables must be created before this table is created
      tbl.increments()

      tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      tbl
      .integer('student_id')
      .unsigned()
      .references('id')
      .inTable('students')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
  // tables with foreign key must be removed before the referenced table is removed
  return knex.schema
  .dropTableIfExists('cohorts_students')
  .dropTableIfExists('students')
  .dropTableIfExists('cohorts')
  .dropTableIfExists('tracks')
};
