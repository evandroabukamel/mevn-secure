const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Load up User model
const User = require('../models/User')
// Get settings file
const settings = require('../config/settings')

module.exports = function(passport) {
	let options = {}
	options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
	options.secretOrKey = settings.secret
	passport.use(new JwtStrategy(options, function(jwtPayload, done) {
		User.FindOne({ id: jwtPayload.id}, function(err, user) {
			if (err) {
				return done(err, false)
			}

			if (user) {
				done(null, user)
			}
			else {
				done(null, false)
			}
		})
	}))
}