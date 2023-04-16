const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      //add unique and trimmed
    },
    email: {
      type: String,
      required: true,
      //add unique
      //look into Matching email validation
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      references: {
        model: "thoughts",
        key: "id",
      },
    }],

    friends:[{
      type: Schema.Types.ObjectId,
      references: {
        model: 'user',
        key: 'id',
      },
    }],
    
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });
  
  
  


const User = model("user", userSchema);

module.exports = User;
