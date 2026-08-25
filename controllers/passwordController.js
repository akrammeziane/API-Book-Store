const asyncHandler = require("express-async-handler");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @desc Get forgot password page
 * @route GET /password/forgot-password
 * @access Public
 */

const getForgotPassword = asyncHandler((req, res) => {
  return res.render("forgot-password");
});

/**
 * @desc send the new password
 * @route POST /password/forgot-password
 * @access Public
 */

const sendPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ Email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  const secret = process.env.JWT_TOKEN + user.Password;
  const token = jwt.sign({ Email: user.Email, id: user.id }, secret, {
    expiresIn: "10m",
  });

  const Link = `http://localhost:3000/password/reset-password/${user.id}/${token}`;

  res.status(200).json({
    message: "please follow the link to reset your password",
    resetPasswordLink: Link,
  });
});

/**
 * @desc Get the reset password view
 * @route GET /password/reset-password
 * @access Public
 */

const getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  const secret = process.env.JWT_TOKEN + user.Password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.Email });
  } catch (err) {
    res.status(400).json({ message: "Error occcured" });
  }
});

/**
 * @desc Seding the new password
 * @route POST /password/reset-password
 * @access Public
 */

const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  const secret = process.env.JWT_TOKEN + user.Password;
  console.log("the password is ", req.body.password);
  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    const NewPassword = await bcrypt.hash(req.body.password, salt);
    user.Password = NewPassword;
    await user.save();
    res.render("success-reset-password");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
});

module.exports = {
  getForgotPassword,
  sendPassword,
  getResetPasswordView,
  resetPassword,
};
