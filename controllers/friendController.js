
const { User } = require("../models");



module.exports = {
  async addFriend(req, res) {
    try {
      const friendId = req.params.friendId;
      const userId = req.params.userId;

      const user = await User.findById(userId).populate('friends');

      // validates duplicate friends 
      const isFriend = user.friends.some(friend => friend.equals(friendId));

      //return if if duplicate friend
      if (isFriend) {
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

  async deleteFriend(req, res) {
    try {
      const friendId = req.params.friendId;
      const userId = req.params.userId;

      const user = await User.findById(userId).populate('friends');

      // validates duplicate friends 
      const isFriend = user.friends.some(friend => friend.equals(friendId));

      //return if if duplicate friend
      if (!isFriend) {
        return res.status(400).json({ message: "Friend not found to delete" });
      }

      
      const newFriendList = user.friends.filter(friend => !friend.equals(friendId));

      console.log(newFriendList)
      user.friends = newFriendList

      await user.save();

      
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};
