const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  postNewThought, 
  // (don't forget to push the created thought's _id to the associated user's thoughts array field)
  updateThoughtById,
  removeThoughtById,
  newReaction,
  removeReaction
} = require('../../controllers/thoughtsController');


router.route('/').get(getAllThoughts).post(postNewThought);
// POST to create a reaction stored in a single thought's reactions array field


router.route('/:thoughtId').get(getSingleThought).put(updateThoughtById).delete(removeThoughtById);
router.route('/:thoughtId/reactions').post(newReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)


module.exports = router;
