const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  updateById,
  removeById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

//http://localhost:3001/api/users/
router.route('/').get(getAllUsers).post(postNewUser);


//http://localhost:3001/api/users/123
router.route('/:userId').get(getSingleUser).put(updateById).delete(removeById);
//http://localhost:3001/api/users/123/friends/456
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;