const router = require("express").Router();
const { getAllUsers, getSingleUser, updateSingleUser } = require("../../controllers/userController");

router.route("/").get(getAllUsers)

// .post(createUser);

router.route("/:userID").get(getSingleUser).put(updateSingleUser)



// .delete(deleteUser);

module.exports = router;
