// WORKING WITH EXPRESSJS
const express = require("express");
const app = express();
// CALLING THE MIDDLEWARES
const { notFound, errorhandler } = require("./middlewares/errors");
const logger = require("./middlewares/logger");
app.use(express.urlencoded({ extended: false }));
// CONNECTING TO DP
const connectToDB = require("./config/db");
// WORKING WITH .ENV
require("dotenv").config();

// TRANSLATE THE REQUESTS TO JSON
app.use(express.json());

// MAKE THE PUBLIC FOLDER SERVABLE
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// connecting to data base

connectToDB();

// LOGGER

app.use(logger);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/users", require("./routes/user"));
app.use("/password", require("./routes/password"));
app.use("/api/upload", require("./routes/upload"));

// middlewares
app.use(notFound);
app.use(errorhandler);
//Run the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} in  on port ${process.env.PORT}`,
  );
});
