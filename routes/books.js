const express = require("express");
const joi = require("joi");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Book, validateBook, validateUpdateBook } = require("../Models/Books");
// const books = [
//   { id: 1, title: "Book 1", author: "Author 1", price: 10.99 },
//   { id: 2, title: "Book 2", author: "Author 2", price: 12.99 },
//   { id: 3, title: "Book 3", author: "Author 3", price: 15.99 },
// ];
router.use(express.json());

/**
 * @desc Get all books
 * @route GET /api/books
 * @access Public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const booksList = await Book.find().populate("author", [
      "_id",
      "FirstName",
      "LastName",
    ]);
    res.status(200).json(booksList);
  }),
);
/**
 * @desc Get books by ID
 * @route GET /api/books/:id
 * @access Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log("the request is", req);
    console.log("the params is ", req.params);
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).send("Book not found");
    }
  }),
);

/**
 * @desc Create a new book
 * @route POST /api/books
 * @access Public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
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
    book.save();
    res.status(201).json(book);
  }),
);

/**
 * @desc Edit a book by ID
 * @route PUT /api/books/:id
 * @access Public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
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
  }),
);
/**
 * @desc delete a book by ID
 * @route DELETE /api/books/:id
 * @access Public
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).send("Book deleted successfully");
    } else {
      res.status(404).send("Book not found");
    }
  }),
);

module.exports = router;
