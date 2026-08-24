const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/verifytoken");
const {
  getAuthors,
  getAuthorById,
  addAuthor,
  editAuthor,
  deleteAuthor,
} = require("../controllers/authorscontroller");
// const authors = [
//   {
//     id: 1,
//     FirstName: "Author 1",
//     LastName: "Bio of Author 1",
//     age: 45,
//     nationality: "Author 1 nationality",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXV0aG9yfGVufDB8fDB8fHww&w=1000&q=80",
//   },
//   {
//     id: 2,
//     FirstName: "Author 2",
//     LastName: "Bio of Author 2",
//     age: 50,
//     nationality: "Author 2 nationality",
//   },
//   {
//     id: 3,
//     FirstName: "Author 3",
//     LastName: "Bio of Author 3",
//     age: 60,
//     nationality: "Author 3 nationality",
//   },
// ];

router.route("/").get(getAuthors).post(verifyAdmin, addAuthor);

router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyAdmin, editAuthor)
  .delete(verifyAdmin, deleteAuthor);

module.exports = router;
