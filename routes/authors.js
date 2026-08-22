const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {
  Author,
  validateAuthor,
  validateUpdateAuthor,
} = require("../Models/Authors");
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

router.use(express.json());

/**
 * @desc Get all authors
 * @route GET /api/authors
 * @access Public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorlists = await Author.find();
    // .sort({ FirstName: -1 })
    // .select("FirstName LastName -_id");
    res.status(200).json(authorlists);
  }),
);

/**
 * @desc Get author by ID
 * @route GET /api/authors/:id
 * @access Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  }),
);

/**
 * @desc Create a new author
 * @route POST /api/authors
 * @access Public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.body);

    const error = validateAuthor(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const author = new Author({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      age: req.body.age,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    return res.status(201).json(result);
  }),
);

/**
 * @desc Edit an author by ID
 * @route PUT /api/authors/:id
 * @access Public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const error = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          age: req.body.age,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true },
    );
    res.status(200).json(author);
  }),
);

/**
 * @desc Delete an author by ID
 * @route DELETE /api/authors/:id
 * @access Public
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Author deleted successfully" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  }),
);

module.exports = router;
