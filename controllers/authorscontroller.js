const asyncHandler = require("express-async-handler");

const {
  Author,
  validateAuthor,
  validateUpdateAuthor,
} = require("../Models/Authors");

/**
 * @desc Get all authors
 * @route GET /api/authors
 * @access Public
 */

const getAuthors = asyncHandler(async (req, res) => {
  // PAGINATION
  const PageNumber = parseInt(req.query.PageNumber) || 1;
  const AuthorPerPage = 2;
  const skip = (PageNumber - 1) * AuthorPerPage;
  const authorlists = await Author.find().skip(skip).limit(AuthorPerPage);
  // .sort({ FirstName: -1 })
  // .select("FirstName LastName -_id");
  res.status(200).json(authorlists);
});

/**
 * @desc Get author by ID
 * @route GET /api/authors/:id
 * @access Public
 */

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});
/**
 * @desc Create a new author
 * @route POST /api/authors
 * @access Private(only admin)
 */

const addAuthor = asyncHandler(async (req, res) => {
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
});

/**
 * @desc Edit an author by ID
 * @route PUT /api/authors/:id
 * @access Private (only admin)
 */

const editAuthor = asyncHandler(async (req, res) => {
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
});

/**
 * @desc Delete an author by ID
 * @route DELETE /api/authors/:id
 * @access Private(ony admin)
 */

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author deleted successfully" });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});
module.exports = {
  getAuthors,
  getAuthorById,
  addAuthor,
  editAuthor,
  deleteAuthor,
};
