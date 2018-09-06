const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const connection = require('knex')(config)

// Get all data.
const getAllData = (db = connection) => {
  return db('scores')
    .select()
}

// Get record by ID.
const getRecordById = (id, db = connection) => {
  return db('scores')
    .where('scores.id', id)
    .first()
}

// Get records by category
const getRecordByCat = (cat, db = connection) => {
  return db('scores')
    .where('scores.category', cat)
    .select()
}

// Insert player score.
const insertScore = (record, db = connection) => {
  return db('scores')
    .insert(record)
}

module.exports = {
  getAllData,
  getRecordById,
  insertScore,
  getRecordByCat
}
