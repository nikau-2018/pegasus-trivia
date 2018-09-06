const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const connection = require('knex')(config)

// Get all data.
const getAllData = (db = connection) => {
  return db('scores')
    .select()
}

// Insert player score.
const insertScore = (record, db = connection) => {
  return db('scores')
    .insert(record)
}

module.exports = {
  getAllData,
  insertScore
}
