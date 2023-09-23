const { User } = require("../models");

module.exports = {
  async addFriend(req, res) {
    try {
      const friendId = req.params.friendId;
      const userId = req.params.userId;

      const user = await User.findById(userId).populate('friends');

      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "Already friends" });
      }

      user.friends.push(friendId);

      await user.save();

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
