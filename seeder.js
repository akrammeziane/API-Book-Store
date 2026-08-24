const { Book } = require("./Models/Books");
const { Author } = require("./Models/Authors");
const connectToDB = require("./config/db");
const { books, authors } = require("./data");
require("dotenv").config();

connectToDB();
/// MANAGING BOOKS
const ImportBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("books imported sucseccefully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
const DeleteBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("books deleted sucseccefully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "import") {
  ImportBooks();
} else if (process.argv[2] === "delete") {
  DeleteBooks();
}
/// MANAGING AUTHORS

const ImportAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("authors imported sucseccefully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
const DeleteAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("authors deleted sucseccefully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "import-authors") {
  ImportAuthors();
} else if (process.argv[2] === "delete-authors") {
  DeleteAuthors();
}
