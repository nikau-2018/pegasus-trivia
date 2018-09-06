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

module.exports = router
