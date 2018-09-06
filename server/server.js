const express = require('express')
const path = require('path')

const apiV1 = require('./routes/V1/api')

const server = express()

// Middleware
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, 'public')))

// temporary
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Routes
server.use('/api/v1', apiV1)

module.exports = server
