const express = require("express");
const router = express.Router();

const {
  getForgotPassword,
  sendPassword,
  getResetPasswordView,
  resetPassword,
} = require("../controllers/passwordController");

router.route("/forgot-password").get(getForgotPassword).post(sendPassword);
router
  .route("/reset-password/:id/:token")
  .get(getResetPasswordView)
  .post(resetPassword);

module.exports = router;
