const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
router.use(express.json());
const {
  User,
  ValidateUser,
  ValidateUpdateUser,
  ValidateLogin,
} = require("../Models/User");
/**
 * @desc : Get All Users
 * @route : GET /api/users
 * @access:Public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const UserList = await User.find();
    res.status(200).json(UserList);
  }),
);

/**
 * @desc : Get Users By ID
 * @route : GET /api/users/:id
 * @access:Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  }),
);

/**
 * @desc : Add an user
 * @route : Post /api/users/:id
 * @access:Public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const error = ValidateUser(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const newUser = new User({
      Email: req.body.Email,
      UserName: req.body.UserName,
      Password: req.body.Password,
      isAdmin: req.body.isAdmin,
    });
    const result = await newUser.save();
    res.status(201).json(result);
  }),
);
/**
 * @desc : delete an user by id
 * @route : Delete /api/users/:id
 * @access:Public
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      console.log(req.params);
      res.status(200).json({
        message: `User with name ${user.UserName} and id : ${req.params.id} deleted sucsessfully`,
      });
    } else {
      res.status(400).json({ message: "User not found !" });
    }
  }),
);
/**
 * @desc : edit an user by id
 * @route : Put /api/users/:id
 * @access:Public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const error = ValidateUpdateUser(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Email: req.body.Email,
          UserName: req.body.UserName,
          Password: req.body.Password,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true },
    );
    res.status(201).json(editedUser);
  }),
);

module.exports = router;
