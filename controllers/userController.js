const { User, Thought } = require("../models");

module.exports = {
  // Get all students
  async getAllUsers(req, res) {
    try {
      console.log("Getting All Users");
      const users = await User.find({});

      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Get Single user by ID passed in params
  async getSingleUser(req, res) {
    try {
      const id = req.params.userId;
      console.log(`Getting single User with id ${id}`);
      const user = await User.findById(id)
        .populate("friends")
        .populate("thoughts");

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateSingleUser(req, res) {
    try {
      const id = req.params.userId;
      console.log(`Updating user: ${id}`);
      const { username, email } = req.body;

      if (!username && !email) {
        return res
          .status(400)
          .json({ message: "No username or email field to update" });
      }

      const update = {};
      if (username) {
        update.username = username;
      }
      if (email) {
        update.email = email;
      }

      const result = await User.updateOne({ _id: id }, { $set: update });

      // Check if a document was updated
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "User not found or no changes were made" });
      }

      const updatedUser = await User.find({ _id: id });
      console.log(updatedUser);

      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      // destructure the username and email from the json body
      const { username, email } = req.body;
      console.log(`creating new user ${username + " " + email}`);

      //Check if the user exists
      const userCheck = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });

      // The the user does exists, return a 400 error
      if (userCheck) {
        console.log("User Exists");
        return res.status(400).json({ message: "User Exists" });
      }

      // Create the new user
      const newUser = await User.create({ username, email });
      console.log(newUser);

      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete User
  async deleteUser(req, res) {
    try {
      const id = req.params.userId;
      console.log(`Deleting User id: ${id}`);

      const {username} = await User.findOne({_id: id})


      const deletedThoughts = await Thought.deleteMany({username: username})
      console.log(deletedThoughts)

      const deletedUser = await User.deleteOne({ _id: id });
      console.log(deletedUser);

      res.status(200).json(deletedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
