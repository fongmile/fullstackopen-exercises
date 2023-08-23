const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bloguserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength:3
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
})

bloguserSchema.plugin(uniqueValidator)

bloguserSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash
	}
})

const Bloguser = mongoose.model('Bloguser', bloguserSchema)

module.exports = Bloguser