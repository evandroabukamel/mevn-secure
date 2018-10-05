const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')

// instantiates express
const app = express()

// db instance connection
require("./config/db");

app.use(helmet());
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))

// require routes declarations
require('./routes/index')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not found')
  err.status = 404
  next(err)
})

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err)

  if (req.app.get('env') !== 'development') {
    delete err.stack
  }
  res.status(err.statusCode || 500).json(err)
})

module.exports = app
