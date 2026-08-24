const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema(
  {
    Email: {
      type: String,
      minlength: 5,
      maxlength: 200,
      required: true,
      trim: true,
      unique: true,
    },
    UserName: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      minlength: 4,
      maxlength: 1000,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
userschema.methods.genTokens = function () {
  return jwt.sign(
    { id: this._id, UserName: this.UserName, isAdmin: this.isAdmin },
    `${process.env.JWT_TOKEN}`,
    { expiresIn: "7d" },
  );
};
function ValidateUser(User) {
  const schema = joi.object({
    Email: joi.string().min(5).max(100).trim().required().email(),
    UserName: joi.string().min(3).max(100).trim().required(),
    Password: joi.string().min(4).max(1000).trim().required(),
  });
  const { error } = schema.validate(User);
  return error;
}
function ValidateUpdateUser(User) {
  const schema = joi.object({
    Email: joi.string().min(5).trim().max(100),
    UserName: joi.string().min(3).max(100).trim(),
    Password: joi.string().min(4).max(1000).trim(),
  });
  const { error } = schema.validate(User);
  return error;
}
function ValidateLogin(User) {
  const schema = joi.object({
    Email: joi.string().min(5).max(100).trim(),
    Password: joi.string().min(4).max(1000).trim(),
  });
  const { error } = schema.validate(User);
  return error;
}
const User = mongoose.model("User", userschema);
module.exports = {
  User,
  ValidateUser,
  ValidateUpdateUser,
  ValidateLogin,
};
