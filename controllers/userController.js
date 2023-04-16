const { User } = require('../models');


module.exports = {
  getAllUsers(req, res) {
    User.find()
      .populate({ path: 'thoughts',  select: '-__v' })
      .populate({ path: 'friends',  select: '-__v' })
      .then((user) => res.json(user))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({ path: 'thoughts',  select: '-__v' })
    .populate({ path: 'friends',  select: '-__v' })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new User
  postNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeById(req, res) {
    Student.findOneAndRemove({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No such user exists' })
        : Course.findOneAndUpdate(
            { students: req.params.studentId },
            { $pull: { students: req.params.studentId } },
            { new: true }
          )
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // create a new User
  addFriend(req, res) {
   
  },
  removeFriend(req, res) {
   
  },
};