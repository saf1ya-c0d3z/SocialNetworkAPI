const { Thoughts, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  postNewThought(req, res) {
    // (404 error: "Thought created, but found no user with that ID")

    Thoughts.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({
                message: "Thought created, but found no user with that ID",
              })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThoughtById(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeThoughtById(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Reaction.deleteMany({ _id: { $in: course.reaction } })
      )
      .then(() => res.json({ message: "Thought and reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
