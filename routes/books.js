const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/verifytoken");
const {
  getBooks,
  getBookById,
  addBook,
  editBook,
  deleteBook,
} = require("../controllers/bookscontroller");
// const books = [
//   { id: 1, title: "Book 1", author: "Author 1", price: 10.99 },
//   { id: 2, title: "Book 2", author: "Author 2", price: 12.99 },
//   { id: 3, title: "Book 3", author: "Author 3", price: 15.99 },
// ];

router.route("/").get(getBooks).post(verifyAdmin, addBook);

router
  .route("/:id")
  .get(getBookById)
  .put(verifyAdmin, editBook)
  .delete(verifyAdmin, deleteBook);

module.exports = router;
