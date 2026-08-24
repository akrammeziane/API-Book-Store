const asyncHandler = require("express-async-handler");
const { User, ValidateUser, ValidateLogin } = require("../Models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc : Add an user
 * @route : Post /api/users/:id
 * @access:Public
 */

const register = asyncHandler(async (req, res) => {
  const error = ValidateUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const user = await User.findOne({ Email: req.body.Email });
  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.Password, salt);

  const newUser = new User({
    Email: req.body.Email,
    UserName: req.body.UserName,
    Password: password,
  });

  const result = await newUser.save();

  const { Password, ...others } = result._doc;
  const token = newUser.genTokens();

  res.status(201).json({ ...others, token });
});

/**
 * @desc : Login
 * @route : Post /api/users/:id
 * @access:Public
 */

const login = asyncHandler(async (req, res) => {
  const error = ValidateLogin(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const user = await User.findOne({ Email: req.body.Email });
  if (!user) {
    return res.status(400).json({ message: "invalid email" });
  }
  const isMatchPassword = await bcrypt.compare(
    req.body.Password,
    user.Password,
  );
  if (!isMatchPassword) {
    return res.status(400).json({ message: "invalid password" });
  }

  const { Password, ...others } = user._doc;
  const token = user.genTokens();

  res.status(200).json({ ...others, token });
});

module.exports = {
  register,
  login,
};
