const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thoughts.deleteMany({});

  // Create empty array to hold the students
 

 

  await User.collection.insertMany(users);



  await Thoughts.collection.insertMany(thoughts);

 




  console.info('Seeding complete! 🌱');
  process.exit(0);
});

