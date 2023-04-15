const router = require('express').Router();
const {
  addFriend,
 removeFriend,
} = require('../../api/users/:userId/friends/:friendId');


router.route('/friends/:friendId').get(addFriend).delete(removeFriend);


module.exports = router;