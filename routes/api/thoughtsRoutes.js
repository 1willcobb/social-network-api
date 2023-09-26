const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
} = require("../../controllers/thoughtController");

// Get all thoughts
router.route("/").get(getAllThoughts);

// Get a single thought by ID
//TODO POST a new thought, and push that id to the associated user's thoughts array
//TODO PUT update thought by ID
//TODO Delete thought by ID
router.route("/:thoughtId").get(getSingleThought);

//TODO post a reaction stored in a single thoughts reaction array field
//TODO delete and remove reaction from reactionId value
router.route("/:thoughtId/reactions");

module.exports = router;
