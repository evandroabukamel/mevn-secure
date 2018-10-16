const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('../models/Book')

/**
 * GET all books.
 */
router.get('/', function(req, res, next) {
  Book.find(function (err, books) {
    if (err)
      return next(err)
    res.json(books)
  })
})

/**
 * GET a book by ID
 */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err)
      return next(err)
    res.json(post)
  })
})

/**
 * CREATE a new book
 */
router.post('/', function(req, res, next) {
  let book = new Book( req.body )
  book.save(function (err) {
    if (err) return next(err)
    res.json(post)
  })
})

/**
 * UPDATE a book by ID
 */
router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err, post) {
    if (err)
      return next(err)
    res.json(post)
  })
})

/**
 * DELETE a book by ID
 */
router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err)
      return next(err)
    res.json(post)
  })
})

module.exports = router