const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Add: use a getter method to format the timestamp on query
    },
    userName: {
      type: String,
      required: true,
    },

    // Array of nested documents created with the reactionSchema

    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema(
  {
    reactionId: {
      //       Use Mongoose's ObjectId data type
      // Default value is set to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
      // Add: use a getter method to format the timestamp on query
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Add: use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactionSchema.length;
  });

// Initialize our Post model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
