const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  postNewThought, 
  // (don't forget to push the created thought's _id to the associated user's thoughts array field)
  updateThById,
  removeThById,
} = require('../../controllers/thoughtsController');


router.route('/').get(getAllThoughts).post(postNewThought);
// POST to create a reaction stored in a single thought's reactions array field


router.route('/:thoughtId/reactions').get(getSingleThought).put(updateThById).delete(removeThById);

module.exports = router;
