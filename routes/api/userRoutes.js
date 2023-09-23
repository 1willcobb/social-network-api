const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

const {
  addFriend
} = require("../../controllers/friendController")

//  get all users
//  createUser
router.route("/")
  .get(getAllUsers)
  .post(createUser);

// get single user by ID Populated with friend data
// Update (PUT) a user by ID
// DELETE user by ID
router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteUser);

//TODO add (post)a new friend to users friend list
//TODO DElete a friend from users friend list
router.route("/:userId/friends/:friendId").put(addFriend);

// .delete(deleteUser);

module.exports = router;
