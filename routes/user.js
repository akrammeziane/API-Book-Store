const express = require("express");
const router = express.Router();
const {
  verifyAuthAndAdmin,
  verifyAdmin,
} = require("../middlewares/verifytoken");
const {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
} = require("../controllers/usercontroller");

router.route("/").get(getUsers);

router
  .route("/:id")
  .get(verifyAdmin, getUserById)
  .delete(verifyAuthAndAdmin, deleteUser)
  .put(verifyAuthAndAdmin, editUser);

module.exports = router;
