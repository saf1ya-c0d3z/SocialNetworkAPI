const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "thoughts",
         
      
    }],

    friends:[{
      type: Schema.Types.ObjectId,
      ref: "user",
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
