const router = require('express').Router();

const {
	getThought,
	getSingleThought,
	createThought,
	updateThought,
	createReaction,
	deleteReaction,
	deleteThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought);

router
	.route('/:thoughtId')
	.get(getSingleThought)
	.post(createThought)
	.put(updateThought)
	.delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
