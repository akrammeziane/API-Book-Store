const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User, ValidateUser, ValidateLogin } = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.use(express.json());

/**
 * @desc : Add an user
 * @route : Post /api/users/:id
 * @access:Public
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
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
    // const token = null;
    const { Password, ...others } = result._doc;
    const token = jwt.sign(
      { id: newUser._id, UserName: newUser.UserName, isAdmin: newUser.isAdmin },
      `${process.env.JWT_TOKEN}`,
    );

    res.status(201).json({ ...others, token });
  }),
);
/**
 * @desc : Login
 * @route : Post /api/users/:id
 * @access:Public
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
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
    const token = jwt.sign(
      { id: user._id, UserName: user.UserName, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN,
    );

    res.status(200).json({ ...others, token });
  }),
);
module.exports = router;
