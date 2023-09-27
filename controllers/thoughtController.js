const { Thought, User } = require("../models");

module.exports = {
  // get a list of all thoughts and their reactions
  async getAllThoughts(req, res) {
    try {
      console.log("Getting All Thoughts...");

      // get all thoughts and populate reactions
      const allThoughts = await Thought.find().populate("reactions");

      if (!allThoughts) {
        console.log("No thoughts found");
        return res.status(404).json({ message: "No thoughts found" });
      }

      console.log("Success");
      res.status(200).json(allThoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a single thought and its reactions
  async getSingleThought(req, res) {
    try {
      console.log("Getting single Thought");
      const id = req.params.thoughtId;

      // find single thought by id and show the reactions
      const singleThought = await Thought.findById(id).populate("reactions");

      // check if thought was found
      if (!singleThought) {
        console.log("No thought found");
        res.status(404).json({ message: "No thought found" });
      }

      console.log("Success");
      res.status(200).json(singleThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new thought
  async createNewThought(req, res) {
    try {
      console.log("creating new thought...");
      const { thoughtText, username } = req.body;

      // Check the data for an existing username
      const user = await User.findOne({ username: username });

      if (!user) {
        console.log("No user found to create thought");
        return res
          .status(404)
          .json({ message: "No user found to create thought" });
      }

      // create the new thought
      const newThought = await Thought.create(req.body);

      // update the user thoughts array with the associated thought
      const userUpdate = await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );

      console.log("Success");
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update a thought
  async updateSingleThought(req, res) {
    try {
      console.log("Updating a thought...");
      const id = req.params.thoughtId;
      const { thoughtText } = req.body;

      // Check the data for an existing username
      const updatedThought = await Thought.findOneAndUpdate(
        { thoughtText },
        { new: true }
      );

      if (!updatedThought) {
        console.log("No user found to update thought");
        return res
          .status(404)
          .json({ message: "No user found to update thought" });
      }

      console.log("Success");
      res.status(200).json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
