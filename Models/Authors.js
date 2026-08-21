const mongoose = require("mongoose");
const joi = require("joi");
const Authorschema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    LastName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
      required: true,
    },
    nationality: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    image: {
      type: String,
      minlength: 10,
      maxlength: 500,
      default:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXV0aG9yfGVufDB8fDB8fHww&w=1000&q=80",
    },
  },
  { timestamps: true },
);
function validateAuthor(author) {
  const schema = joi.object({
    FirstName: joi.string().min(3).max(50).required(),
    LastName: joi.string().min(3).max(50).required(),
    age: joi.number().min(0).max(120).required(),
    nationality: joi.string().min(3).max(50).required(),
    image: joi.string().min(10).max(500),
  });
  console.log("item", schema.validate(author));
  const { error } = schema.validate(author);
  return error;
}
function validateUpdateAuthor(author) {
  const schema = joi.object({
    FirstName: joi.string().min(3).max(50),
    LastName: joi.string().min(3).max(50),
    age: joi.number().min(0).max(120),
    nationality: joi.string().min(3).max(50),
    image: joi.string().min(10).max(500),
  });
  const { error } = schema.validate(author);
  return error;
}

const Author = mongoose.model("Author", Authorschema);

module.exports = { Author, validateAuthor, validateUpdateAuthor };
