// WORKING WITH EXPRESSJS
const express = require("express");
const app = express();
// CALLING THE MIDDLEWARES
const { notFound, errorhandler } = require("./middlewares/errors");
const logger = require("./middlewares/logger");
// CONNECTING TO DP
const connectToDB = require("./config/db");
// WORKING WITH .ENV
require("dotenv").config();

// connecting to data base

connectToDB();

// LOGGER

app.use(logger);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/users", require("./routes/user"));

// middlewares
app.use(notFound);
app.use(errorhandler);
//Run the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} in  on port ${process.env.PORT}`,
  );
});
