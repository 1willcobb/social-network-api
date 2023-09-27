const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateSingleThought,
  deleteThought,
  createReaction
} = require("../../controllers/thoughtController");

// Get all thoughts
// POST a new thought, and push that id to the associated user's thoughts array
router.route("/").get(getAllThoughts).post(createNewThought);

// Get a single thought by ID
// PUT update thought by ID
// Delete thought by ID
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteThought);

// post a reaction stored in a single thoughts reaction array field
//TODO delete and remove reaction from reactionId value
router.route("/:thoughtId/reactions").post(createReaction);

module.exports = router;
