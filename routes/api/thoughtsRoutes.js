const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  postNewThought, 
  updateThoughtById,
  removeThoughtById,
  newReaction,
  removeReaction
} = require('../../controllers/thoughtsController');


router.route('/').get(getAllThoughts).post(postNewThought);



router.route('/:thoughtId').get(getSingleThought).put(updateThoughtById).delete(removeThoughtById);
router.route('/:thoughtId/reactions').post(newReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)


module.exports = router;
