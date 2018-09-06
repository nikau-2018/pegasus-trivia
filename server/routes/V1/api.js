const express = require('express')

const db = require('../../db')

const router = express.Router()

// Get all records.
router.get('/scores', (req, res) => {
  db.getAllData()
    .then(scores => {
      res.send(scores)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// Insert record.
router.post('/scores', (req, res) => {
  const record = req.body
  db.insertScore(record)
    .then(() => {
      res.send(`you're on the board!`)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// Get record by category.
router.get('/scores/:category', (req, res) => {
  const category = req.params.category
  db.getRecordByCat(category)
    .then(records => {
      res.send(records)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

module.exports = router
