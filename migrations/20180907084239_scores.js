exports.up = (knex, Promise) => {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.integer('score')
    table.string('category')
    table.integer('category_id')
    table.string('difficulty')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('scores')
}
