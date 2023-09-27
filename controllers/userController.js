const { User, Thought } = require("../models");

module.exports = {
  // Get all students
  async getAllUsers(req, res) {
    try {
      console.log("Getting All Users...");

      const users = await User.find({});

      console.log("Success");
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

      //find and populate user
      const user = await User.findById(id)
        .populate("friends")
        .populate("thoughts");

      // check if user exists
      if (!user) {
        console.log("No user found");
        return res.status(404).json({ message: "No user found" });
      }

      console.log("Success");
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //update user email or username
  async updateSingleUser(req, res) {
    try {
      console.log("Updating user...");
      const id = req.params.userId;
      const { username, email } = req.body;

      // check if username or email was submitted
      if (!username && !email) {
        return res
          .status(400)
          .json({ message: "No username or email field to update" });
      }

      // create a single place to update on the condition that minimally only one was submitted
      const update = {};
      if (username) {
        update.username = username;
      }
      if (email) {
        update.email = email;
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
      );

      // Check if the update went through
      if (!updatedUser) {
        return res.status(404).json({ message: "No User found" });
      }

      console.log("Success");
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      console.log("Creating new user...");
      // destructure the username and email from the json body
      const { username, email } = req.body;

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

      console.log("Success");
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete User
  async deleteUser(req, res) {
    try {
      console.log("Deleting user...");
      const id = req.params.userId;

      // find the user 
      const user = await User.findOne({ _id: id });

      // check if user exists
      if (!user) {
        console.log("No user found");
        return res.status(404).json({ message: "No user found" });
      }

      // delete thoughts associated with the user. They are stored by username
      const deletedThoughts = await Thought.deleteMany({
        username: user.username,
      });

      // delete user and return the deleted user to confirm
      const deletedUser = await User.findOneAndDelete({ _id: id });

      console.log("Success");
      res.status(200).json(deletedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
