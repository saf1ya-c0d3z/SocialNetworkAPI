const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  updateById,
  removeById,
} = require('../../api/users');


router.route('/').get(getAllUsers).post(postNewUser);


router.route('/:userId').get(getSingleUser).put(updateById).delete(removeById);

module.exports = router;