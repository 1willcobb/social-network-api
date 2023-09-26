const { Thought, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      console.log("Getting All Thoughts");
      const allThoughts = await Thought.find().populate("reactions");

      !allThoughts && res.status(404).json({ message: "No thoughts found" });

      res.status(200).json(allThoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const id = req.params.thoughtId;
      console.log(`Getting single thought with id ${id}`);

      !id && res.status(404).json({ message: "No data submitted" });

      const singleThought = await Thought.findById(id).populate("reactions");

      !singleThought && res.status(404).json({ message: "No thought found" });

      res.status(200).json(singleThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createNewThought(req,res) {
    try {
      const {thoughtText, username} = req.body
      console.log("creating new thought...")

      console.log(username)
      // Check the data for an existing username
      const user = await User.findOne({username: username})

      if(!user) {
        console.log("Canceled New Thought: No user found to create thought")
        return res.status(404).json({message: "No user found to create thought"})
      } 

      const newThought = await Thought.create({
        "thoughtText": thoughtText,
        "username": username,
      })

      console.log(user.thoughts)

      user.thoughts.push(newThought._id)

      console.log(user.thoughts)

      await user.save()


      console.log(newThought)
      
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};
