const connection = require("../config/connection");
const { User, Thoughts } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thoughts.deleteMany({});

 

  const thoughtDocuments = await Thoughts.insertMany(thoughts);
  users.forEach((user) => {
    const userThoughts = thoughtDocuments.filter((thought) => {
      return thought.userName === user.userName;
    });
    user.thoughts.push(...userThoughts.map((thought) => thought.id));
  });
  await User.collection.insertMany(users);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
