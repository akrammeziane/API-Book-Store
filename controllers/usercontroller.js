const asyncHandler = require("express-async-handler");
const {
  User,
  ValidateUser,
  ValidateUpdateUser,
  ValidateLogin,
} = require("../Models/User");

/**
 * @desc : Get All Users
 * @route : GET /api/users
 * @access:Private(only for admin)
 */
const getUsers = asyncHandler(async (req, res) => {
  const UserList = await User.find().select("-Password");
  res.status(200).json(UserList);
});

/**
 * @desc : Get Users By ID
 * @route : GET /api/users/:id
 * @access:Private(only for admin and current user)
 */

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-Password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 * @desc : Add an user
 * @route : Post /api/users/:id
 * @access:Public
 */
// const addUser=()=>{
//     asyncHandler(async (req, res) => {
//     console.log(req.body);
//     console.log(req.params);
//     const error = ValidateUser(req.body);
//     if (error) {
//       return res.status(400).json(error.details[0].message);
//     }
//     const newUser = new User({
//       Email: req.body.Email,
//       UserName: req.body.UserName,
//       Password: req.body.Password,
//       isAdmin: req.body.isAdmin,
//     });
//     const result = await newUser.save();
//     res.status(201).json(result);
//   })
// }

/**
 * @desc : edit an user by id
 * @route : Put /api/users/:id
 * @access:Private(only for admin and current user)
 */

const editUser = asyncHandler(async (req, res) => {
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
  ).select("-Password");
  res.status(200).json(editedUser);
});
/**
 * @desc : delete an user by id
 * @route : Delete /api/users/:id
 * @access:Private(only for admin and current user)
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `User with name ${user.UserName} and id : ${req.params.id} deleted sucsessfully`,
    });
  } else {
    res.status(404).json({ message: "User not found !" });
  }
});
module.exports = {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
};
