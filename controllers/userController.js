const { User, Thought } = require('../models');

module.exports = {
	//Get all users
	async getUsers(req, res) {
		try {
			const user = await User.find();
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	//Get user by id
	async getOneUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId }).select(
				'-__v',
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user was found with that ID!' });
			}

			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	//Post a new User
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	//Update a user by its id
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true },
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user was found with that ID!' });
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	//Delete a user by its id
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user was found with that ID!' });
			}

			await Thought.deleteMany({ _id: { $in: user.thoughts } });
			res.json({ message: 'User and all of their thoughts has been deleted!' });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Add a new friend  to a usre's friend list
	async addFriend(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ new: true },
			);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No user was found with that ID!' });
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Delete a friend from a user's friend list
	async deleteFriend(req, res) {
		try {
			const friend = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ new: true },
			);

			if (!friend) {
				res.status(404).json({ message: 'No user was found with that ID!' });
			}

			res.json({ message: 'Friend has been deleted from the list!' });
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
