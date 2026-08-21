const express = require("express");
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
const moongoose = require("mongoose");
const app = express();
moongoose
  .connect("mongodb://localhost/bookstoreDB", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
useNewUrlParser: (true, app.use("/api/books", booksRouter));
app.use("/api/authors", authorsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
