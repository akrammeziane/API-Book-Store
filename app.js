const express = require("express");
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
const UserRouter = require("./routes/user");
const authpath = require("./routes/auth");
const moongoose = require("mongoose");
const logger = require("./middlewares/logger");

const app = express();
const dotenv = require("dotenv");
const { notFound, errorhandler } = require("./middlewares/errors");
dotenv.config();
// connecting to data base
moongoose
  .connect(process.env.MONGODP_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
// app.use(logger);
// Routes
app.use("/api/auth", authpath);
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/users", UserRouter);

// middlewares
app.use(notFound);
app.use(errorhandler);
//Run the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} in  on port ${process.env.PORT}`,
  );
});
