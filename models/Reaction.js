const { Schema } = require('mongoose');

// Subdocument for reaction 
const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		deafult: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxLength: [280, 'Cannot be longer than 280 characters'],
	},
	username: {
		type: String,
		required: true,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (value) => {
			return new Date(value).toLocaleDateString();
		},
	},
});

module.exports = reactionSchema;
