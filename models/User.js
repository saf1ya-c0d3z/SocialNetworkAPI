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
    thoughts_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "thought",
        key: "id",
      },
    },
    friends_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    createdAt: Date,
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
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });


const User = model("user", userSchema);

module.exports = User;
