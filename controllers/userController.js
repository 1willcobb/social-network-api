const { User } = require("../models");

module.exports = {
  // Get all students
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}).populate("friends");

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
      const user = await User.findById(id).populate("friends");

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateSingleUser(req, res) {
    try {
      const id = req.params.userId;
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

  async createUser(req, res) {
    try {
      console.log("Entered Create User");
      const { username, email } = req.body;

      const newUser = await User.create({ username, email });
      console.log(newUser);

      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const id = req.params.userId;

      const deletedUser = await User.deleteOne({ _id: id });
      console.log(deletedUser);

      res.status(200).json(deletedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
