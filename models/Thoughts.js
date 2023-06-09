const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
      
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    _id: false,
  }
);

const thoughtsSchema = new Schema(
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
      get: (date) => {
        if (date) 
        {return date.toISOString().split("T") [0]};
      },
    },
    userName: {
      type: String,
      required: true,
    },

   
    reactions: [
     reactionSchema
    ],
  },
  {
    toJSON: {
      
      virtuals: true,
      getters: true,
    },
    id: true,
  }
);




thoughtsSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });


const Thought = model("thoughts", thoughtsSchema);

module.exports = Thought;
