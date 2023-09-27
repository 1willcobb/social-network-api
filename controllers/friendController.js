const { User } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      console.log("Adding friend...");
      const friendId = req.params.friendId;
      const userId = req.params.userId;

      const user = await User.findById(userId).populate("friends");

      if (!user) {
        console.log("No user found");
        return res.status(404).json({ message: "No user found" });
      }

      // validates duplicate friends
      const isFriend = user.friends.some((friend) => friend.equals(friendId));

      //return if if duplicate friend
      if (isFriend) {
        console.log("Already Friends!");
        return res.status(400).json({ message: "Already friends" });
      }

      const userUpdated = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { friends: friendId } },
        { new: true }
      );

      console.log("Successfully deleted friend");
      return res.status(200).json(userUpdated);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      console.log("Deleting friend...");
      const friendId = req.params.friendId;
      const userId = req.params.userId;

      // find friend for validation
      const user = await User.findById(userId).populate("friends");

      if (!user) {
        console.log("No user found");
        return res.status(404).json({ message: "No user found" });
      }

      // validates duplicate friends
      const isFriend = user.friends.some((friend) => friend.equals(friendId));

      //return if friend not found
      if (!isFriend) {
        console.log("They are not friends to delete!");
        return res
          .status(404)
          .json({ message: "They are not friends to delete!" });
      }

      // deletes the friend from the user
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      );

      console.log("Successfully deleted friend");
      return res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
