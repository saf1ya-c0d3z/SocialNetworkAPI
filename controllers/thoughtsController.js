const { Thoughts, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  postNewThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
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

  //get help here
  removeThoughtById(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Thoughts.reactions.deleteMany({ _id: { $in: Thoughts.reactions } })
      )
      .then(() => res.json({ message: "Thoughts and reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  newReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No Thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
