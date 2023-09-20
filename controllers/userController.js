const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // Get all students
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});

      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const id = req.params.userID;
      const user = await User.findById(id);

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateSingleUser(req, res) {
    try {
      const id = req.params.userID;

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
};
