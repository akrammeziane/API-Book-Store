const asyncHandler = require("express-async-handler");
const { Book, validateBook, validateUpdateBook } = require("../Models/Books");

/**
 * @desc Get all books
 * @route GET /api/books
 * @access Public
 */
const getBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let booksList = [];
  if (minPrice || maxPrice) {
    booksList = await Book.find({
      price: { $gt: parseFloat(minPrice), $lt: parseFloat(maxPrice) },
    }).populate("author", ["_id", "FirstName", "LastName"]);
  } else {
    booksList = await Book.find().populate("author", [
      "_id",
      "FirstName",
      "LastName",
    ]);
  }
  res.status(200).json(booksList);
});

/**
 * @desc Get books by ID
 * @route GET /api/books/:id
 * @access Public
 */

const getBookById = asyncHandler(async (req, res) => {
  console.log("the request is", req);
  console.log("the params is ", req.params);
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

/**
 * @desc Create a new book
 * @route POST /api/books
 * @access Private(only admin)
 */

const addBook = asyncHandler(async (req, res) => {
  console.log(req.body);

  const error = validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
  });
  const result = await book.save();
  res.status(201).json(result);
});

/**
 * @desc Edit a book by ID
 * @route PUT /api/books/:id
 * @access Private(only admin)
 */
const editBook = asyncHandler(async (req, res) => {
  const error = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
      },
    },
    { new: true },
  );
  console.log("the book is ", book);
  res.status(200).json(book);
});

/**
 * @desc delete a book by ID
 * @route DELETE /api/books/:id
 * @access Private (only admin)
 */

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send("Book deleted successfully");
  } else {
    res.status(404).send("Book not found");
  }
});
module.exports = {
  getBooks,
  getBookById,
  addBook,
  editBook,
  deleteBook,
};
