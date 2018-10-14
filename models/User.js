const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
})

/**
 * When saving an User, if password field is modified, a new hash
 * will be generated.
 */
UserSchema.pre('save', function(next) {
	let user = this
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				return next(err)
			}
			bcrypt.hash(user.password, salt, null, function(err, hash) {
				if (err) {
					return next(err)
				}
				user.password = hash
				next()
			})
		})
	}
	else {
		return next()
	}
})

/**
 * Check if a given password is valid.
 */
UserSchema.methods.comparePasword = function(passwd, cb) {
	bcrypt.compare(passwd, this.password, function(err, isMatch) {
		if (err) {
			return cb(err)
		}
		cb(null, isMatch)
	})
}

module.exports = mongoose.model('User', UserSchema)