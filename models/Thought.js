const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema for thoughts
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			require: true,
			minLength: [1, 'Must be at lease 1 character long'],
			maxLength: [280, 'Cannot be longer than 280 characters'],
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	},
);

thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
