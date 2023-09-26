const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropDatabase('socialdb');
    }

  // Create empty array to hold the students
  const users = [
    {
      username: "Yub",
      email: "yub@gmail.com",
    },
    {
      username: "Tub",
      email: "tub@gmail.com"
    },
    {
      username: "Jub",
      email: "Jub@gmail.com"
    },
    {
      username: "Flub",
      email: "Flub@gmail.com"
    },
    {
      username: "Yub",
      email: "yub@gmail.com"
    },
    {
      username: "Glub",
      email: "glub@gmail.com"
    },
    {
      username: "Mub",
      email: "Mub@gmail.com"
    },
    {
      username: "dub",
      email: "dub@gmail.com"
    },
  ];



  // Add students to the collection and await the results
  await User.collection.insertMany(users);


  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
