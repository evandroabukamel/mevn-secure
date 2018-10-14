const mongoose = require('mongoose')
const passport = require('passport')
const settings = require('../config/settings')
require('../config/passport')(passport)
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')

/**
 * Register a new User
 */
router.post('/register', function(req, res) {
	if (!req.body.username || !req.body.password || !req.body.name) {
		res.json({
			success: false,
			message: 'Please inform name, username and password.'
		})
	}
	else {
		let newUser = new User({
			username: req.body.username,
			passport: req.body.passport,
			name: req.body.name
		})

		// Saves the user
		newUser.save(function(err) {
			if (err) {
				return res.json({
					success: false,
					message: 'Username already exists.'
				})
			}
			res.json({
				success: true,
				message: 'New user created successfully.'
			})
		})
	}
})

/**
 * Authenticate the user.
 */
router.post('/login', function(req, res) {
	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if (err) {
			throw err;
		}

		if (!user) {
			res.status(401).send({
				success: false,
				message: 'Authentication failed. User not found.'
			})
		}
		else {
			// Check if password matches
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
					// If user was found and password is right create a token
					let token = jwt.sign(user.toJSON(), setting.secret)
					// Return the information including token as JSON
					res.json({
						success: true,
						token: 'JWT ' + token
					})
				}
				else {
					res.status(401).send({
						success: false,
						message: 'Authentication failed. Wrong password.'
					})
				}
			})
		}
	})
})

module.exports = router