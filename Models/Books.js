const mongoose = require("mongoose");
const joi = require("joi");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      minlength: 5,
      maxlength: 20,
      ref: "Author",
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { timestamps: true },
);
function validateBook(book) {
  const schema = joi.object({
    title: joi.string().min(3).max(20).required(),
    author: joi.string().min(5).max(20).required(),
    price: joi.number().min(0).required(),
  });
  const { error } = schema.validate(book);
  return error;
}

function validateUpdateBook(book) {
  const schema = joi.object({
    title: joi.string().min(3).max(20),
    author: joi.string().min(5).max(20),
    price: joi.number().min(0),
  });
  const { error } = schema.validate(book);
  return error;
}

const Book = mongoose.model("Book", BookSchema);

module.exports = { Book, validateBook, validateUpdateBook };
