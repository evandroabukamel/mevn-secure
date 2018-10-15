const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
const Book = require('../models/Book')

/**
 * GetToken function.
 */
const getToken = function(headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ')
    if (parted.length === 2)
      return parted[1]
    else
      return null
  }
  else
    return null
}

/**
 * GET all books.
 */
router.get('/', function(req, res, next) {
  Book.find(function (err, books) {
    if (err) return next(err)
    res.json(books)
  })
})

/**
 * GET a book by ID
 */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/**
 * CREATE a new book
 */
router.post('/', passport.authenticate('jwt', { sesion: false }), function(req, res, next) {
  let token = getToken(req.headers)
  if (token) {
      Book.create(req.body, function (err, post) {
        if (err) return next(err)
        res.json(post)
      })
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized.'
    })
  }
})

/**
 * UPDATE a book by ID
 */
router.put('/:id', passport.authenticate('jwt', { sesion: false }), function(req, res, next) {
  let token = getToken(req.headers)
  if (token) {
    Book.findByIdAndUpdate({ id: req.params.id }, req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized.'
    })
  }
})

/**
 * DELETE a book by ID
 */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router