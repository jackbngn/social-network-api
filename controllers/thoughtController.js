const { Thought, User } = require('../models');

module.exports = {
	// get all thoughts
	async getThought(req, res) {
		try {
			const thought = await Thought.find();
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// get a single thought by id
	async getSingleThought(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId });
			if (!thought) {
				return res
					.status(404)
					.json({ message: 'No thoughts were found with that ID!' });
			}

			res.json(thought);
		} catch (err) {
			res.status(404).json(err);
		}
	},
	// create a new thought
	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body);
			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought._id } },
				{ runValidators: true, new: true },
			);

			if (!user) {
				return res.status(404).json({
					message:
						'Thought was created, but there was no user found with that ID!',
				});
			}

			res.json('Thought was created!');
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// update thought by id
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ new: true },
			);

			if (!thought) {
				res.status(404).json({ message: 'No thought was found with that ID!' });
			}
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// delete thought by id
	async deleteThought(req, res) {
		try {
			const thought = await Thought.findOneAndRemove({
				_id: req.params.thoughtId,
			});

			if (!thought) {
				return res
					.status(404)
					.json({ message: 'No thought was found with that ID!' });
			}

			const user = await User.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } },
				{ new: true },
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user was found with that ID!' });
			}

			res.json({ message: 'Thought was deleted!' });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// create reaction
	async createReaction(req, res) {
		try {
			const reaction = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true },
			);
			res.json(reaction);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	// delete reaction by reaction id
	async deleteReaction(req, res) {
		try {
			const reaction = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { _id: req.params.reactionId } } },
				{ new: true },
			);

			if (!reaction) {
				res
					.status(404)
					.json({ message: 'No reaction was found with that ID!' });
			}
			res.json(reaction);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
